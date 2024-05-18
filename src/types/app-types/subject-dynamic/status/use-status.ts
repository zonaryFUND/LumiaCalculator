import { useMemo } from "react";
import { SubjectConfig } from "../config/type";
import { Status, StatusBeforeCalculation } from "./type";
import { baseStatus, mastery } from "app-types/subject-static";
import { EquipmentStatus, PerLevelStatus, PerLevelStatusKeys, equipmentStatus } from "app-types/equipment";
import Decimal from "decimal.js";
import { standardCalc } from "./standard-calculation";
import { maxHPCalc } from "./maxhp-calclation"
import { BaseBasicAttackRange, BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, MovementSpeedPerMastery, SkillReductionPerMastery } from "./standard-values";
import { defenseMasteryCalc } from "./defenseMasteryCalc";
import { attackCalc } from "./attack-calculation";
import { basicAttackAmpCalc } from "./basic-attack-amp-calculation";
import { attackSpeedCalc } from "./attack-speed-calculation";
import { WeaponTypeID, weaponTypeStatus } from "app-types/equipment/weapon";
import { movementSpeedSpeedCalc } from "./movement-speed-calculation";
import { basicAttackRangeCalc } from "./basic-attack-range-calculation";
import { SubjectStatusOverride } from "components/subjects/status-override";


function sumEquipmentStatus(key: keyof EquipmentStatus, equipments: EquipmentStatus[]): Decimal | undefined {
    return equipments
        .map(equipment => equipment[key])
        .filter((value): value is Decimal => value != null)
        .reduce((prev: (Decimal | undefined), current) => {
            return prev ? prev.add(current) : current;
        }, undefined);
}

function maxEquipmentStatus(key: keyof EquipmentStatus, equipments: EquipmentStatus[]): Decimal | undefined {
    const values = equipments
        .map(equipment => equipment[key])
        .filter((value): value is Decimal => value != null);

    return values.length == 0 ? undefined : Decimal.max(...values);
}

export function useStatus(config: SubjectConfig): Status {
    const baseStatusValues = useMemo(() => {
        return baseStatus(config.subject);
    }, [config.subject]);

    const equipments = Object.values(config.equipment)
        .filter((id): id is string => id !== null)
        .map(equipmentStatus);

    const [weaponType, weaponBaseStatus] = useMemo(() => {
        if (config.equipment.weapon == null) return [undefined, undefined];

        const type = equipmentStatus(config.equipment.weapon).type as WeaponTypeID;
        const weaponBaseStatus = weaponTypeStatus(type);
        return [type, weaponBaseStatus];
    }, [config.equipment.weapon]);

    const masteryFactor = useMemo(() => {
        if (weaponType == undefined) return undefined;        
        return mastery(config.subject).find(m => m.weapon == weaponType);
    }, [config.subject, weaponType]);

    const perLevelStatus = (() => {
        const values = equipments
            .map(equipment => equipment.perLevelStatus)
            .filter((value): value is PerLevelStatus => value !== undefined)

        return PerLevelStatusKeys
            .reduce((prev, key) => {
                const filtered = values  
                    .filter(v => v.type == key)
                if (filtered.length == 0) {
                    return prev;
                }
                return {
                    ...prev,
                    [key]: filtered.reduce((p, c) => (p ? p.add(c.value) : c.value), null as Decimal | null)
                }
            }, {} as Partial<Record<typeof PerLevelStatusKeys[number], Decimal>>) ;
    })();

    const equipmentValue = (constKey: keyof EquipmentStatus, perLevel?: Decimal) => {
        const constant = sumEquipmentStatus(constKey, equipments);
        if (constant || perLevel) {
            return { constant, perLevel };
        } else {
            return undefined;
        }
    }

    const hpRegenEquipment = (() => {
        const value = sumEquipmentStatus("hpRegeneration", equipments);
        return value ? { ratio: value } : undefined;
    })();

    const spRegenEquipment = (() => {
        const value = sumEquipmentStatus("spRegeneration", equipments);
        return value ? { ratio: value } : undefined;
    })();

    const attackSpeedEquipment = sumEquipmentStatus("attackSpeed", equipments);
    const cdrCap = maxEquipmentStatus("cdrCap", equipments) ?? new Decimal(0);
    const movementSpeedEquipment = (() => {
        const value = sumEquipmentStatus("movementSpeed", equipments);
        return value ?  { constant: value } : undefined;
    })();
    const visionEquipment = (() => {
        const value = maxEquipmentStatus("vision", equipments);
        return value ? { constant: value } : undefined;
    })();
    const basicAttackRangeEquipment = maxEquipmentStatus("attackRange", equipments);
    const criticalChanceEquipment = sumEquipmentStatus("criticalChance", equipments);

    const baseValue: StatusBeforeCalculation = {
        maxHP: {
            base: baseStatusValues.maxHP,
            perLevel: baseStatusValues.maxHPperLevel,
            equipment: equipmentValue("maxHP", perLevelStatus.max_hp),
        },
        hpReg: {
            base: baseStatusValues.hpRegeneration,
            perLevel: baseStatusValues.hpRegenPerLevel,
            equipment: hpRegenEquipment,
        },
        defense: {
            base: baseStatusValues.armor,
            perLevel: baseStatusValues.armorPerLevel,
            equipment: equipmentValue("defense")
        },
        maxSP: {
            base: baseStatusValues.maxSP,
            perLevel: baseStatusValues.maxSPperLevel,
            equipment: equipmentValue("maxSP")
        },
        basicAttackReduction: {
            perMastery: {
                ratio: BasicAttackReductionPerMastery
            }
        },
        skillReduction: {
            perMastery: {
                ratio: SkillReductionPerMastery
            },
            equipment: equipmentValue("skillDamageReduction")
        },
        spReg: {
            base: baseStatusValues.spRegeneration,
            perLevel: baseStatusValues.spRegenPerLevel,
            equipment: spRegenEquipment,
        },
        attackPower: {
            base: baseStatusValues.attackPower,
            perLevel: baseStatusValues.apPerLevel,
            equipment: equipmentValue("attackPower", perLevelStatus.attack_power),
            perMastery: masteryFactor?.type == "attack_power" ? {
                value: masteryFactor.value
            } : undefined
        },
        basicAttackAmp: {
            perMastery: masteryFactor?.type == "basic_attack_amp" ? {
                ratio: masteryFactor.value
            } : undefined,
            equipment: perLevelStatus.aa_amp ? {
                perLevel: perLevelStatus.aa_amp
            } : undefined
        },
        attackSpeed: {
            base: baseStatusValues.attackSpeed,
            equipment: weaponBaseStatus || attackSpeedEquipment ? {
                constant: weaponBaseStatus?.attackSpeed,
                ratio: attackSpeedEquipment
            } : undefined,
            perMastery: masteryFactor ? {
                ratio: masteryFactor.attackSpeed
            } : undefined
        },
        criticalChance: {
            equipment: criticalChanceEquipment ? {
                constant: criticalChanceEquipment.clamp(0, 100)
            } : undefined
        },
        criticalDamage: {
            calculatedValue: sumEquipmentStatus("criticalDamage", equipments) ?? new Decimal(0)
        },
        skillAmp: {
            equipment: {
                ...equipmentValue("skillAmplification", perLevelStatus.skill_amp),
                ratio: maxEquipmentStatus("ampRatio", equipments)
            },
            perMastery: masteryFactor?.type == "skill_amp" ? {
                ratio: masteryFactor.value
            } : undefined
        },
        cooldownReduction: { 
            cap: cdrCap,
            calculatedValue: (sumEquipmentStatus("cooldownReduction", equipments) ?? new Decimal(0)).clamp(0, BaseCooldownCap.add(cdrCap))
        },
        armorPenetration: {},
        armorPenetrationRatio: {},
        lifeSteal: {},
        omnisyphon: {},
        healPower: {},
        tenacity: {},
        movementSpeed: {
            base: baseStatusValues.movementSpeed,
            equipment: movementSpeedEquipment
        },
        visionRange: {
            base: BaseVision,
            equipment: visionEquipment
        },
        basicAttackRange: {
            base: BaseBasicAttackRange,
            equipment: weaponBaseStatus ? {
                constant: weaponBaseStatus.range,
                ratio: basicAttackRangeEquipment    // This value is not "ratio", but is stored here for convenience
            } : undefined
        }
    }

    const overrideFunc = useMemo(() => SubjectStatusOverride[config.subject], [config.subject]);
    const overriddenValue = overrideFunc ? overrideFunc(baseValue, config) : baseValue;    

    const adaptive = sumEquipmentStatus("adaptiveStatus", equipments);
    const attackWithoutAdaptive = attackCalc(overriddenValue.attackPower, {level: config.level, mastery: config.weaponMastery});
    const ampWithoutAdaptive = standardCalc(overriddenValue.skillAmp, {level: config.level, mastery: config.weaponMastery}, 0);
    const addAdaptiveTo = adaptive == undefined ? undefined :
        attackWithoutAdaptive.calculatedValue.greaterThanOrEqualTo(ampWithoutAdaptive.calculatedValue) ? "attack" : "amp";

    return {
        maxHP: maxHPCalc(overriddenValue.maxHP, {level: config.level}),
        hpReg: standardCalc(overriddenValue.hpReg, {level: config.level}, 2),
        defense: standardCalc(overriddenValue.defense, {level: config.level}, 0),
        maxSP: standardCalc(overriddenValue.maxSP, {level: config.level}, 0),
        basicAttackReduction: defenseMasteryCalc(overriddenValue.basicAttackReduction, {mastery: config.defenseMastery}),
        skillReduction: defenseMasteryCalc(overriddenValue.skillReduction, {mastery: config.defenseMastery}),
        spReg: standardCalc(overriddenValue.spReg, {level: config.level}, 2),
        attackPower: attackCalc({
            ...attackWithoutAdaptive,
            equipment: {
                ...equipmentValue("attackPower", perLevelStatus.attack_power),
                adaptive: addAdaptiveTo == "attack" ? adaptive : undefined
            }
        }, {level: config.level, mastery: config.weaponMastery}),
        basicAttackAmp: basicAttackAmpCalc(overriddenValue.basicAttackAmp, {level: config.level, mastery: config.weaponMastery}),
        attackSpeed: overriddenValue.attackSpeed.calculatedValue ? {
            ...overriddenValue.attackSpeed,
            calculatedValue: overriddenValue.attackSpeed.calculatedValue
        } : attackSpeedCalc(overriddenValue.attackSpeed, {mastery: config.weaponMastery}),
        criticalChance: (() => {
            const calculated = standardCalc(overriddenValue.criticalChance, {}, 0);
            return {
                ...calculated,
                calculatedValue: calculated.calculatedValue.clamp(0, 100)
            }
        })(),
        criticalDamage: overriddenValue.criticalDamage as any,
        skillAmp: addAdaptiveTo == "amp" ? standardCalc({
            ...ampWithoutAdaptive,
            equipment: {
                ...ampWithoutAdaptive.equipment,
                adaptive: adaptive?.times(2)
            }
        }, {level: config.level, mastery: config.weaponMastery}, 0) : ampWithoutAdaptive,
        cooldownReduction: overriddenValue.cooldownReduction as any,
        armorPenetration: {
            calculatedValue: sumEquipmentStatus("armorPenetration", equipments) ?? new Decimal(0)
        },
        armorPenetrationRatio: {
            calculatedValue: sumEquipmentStatus("armorPenetrationRatio", equipments) ?? new Decimal(0)
        },
        lifeSteal: {
            calculatedValue: sumEquipmentStatus("lifeSteal", equipments) ?? new Decimal(0)
        },
        omnisyphon: {
            calculatedValue: sumEquipmentStatus("omnisyphon", equipments) ?? new Decimal(0)
        },
        healPower: {
            calculatedValue: sumEquipmentStatus("healingPower", equipments) ?? new Decimal(0)
        },
        tenacity: {
            calculatedValue: maxEquipmentStatus("tenacity", equipments) ?? new Decimal(0)
        },
        movementSpeed: movementSpeedSpeedCalc(overriddenValue.movementSpeed, {mastery: config.movementMastery}),
        visionRange: standardCalc(overriddenValue.visionRange, {}, 2),
        basicAttackRange: overriddenValue.basicAttackRange.calculatedValue ? {
            ...overriddenValue.basicAttackRange,
            calculatedValue: overriddenValue.basicAttackRange.calculatedValue
        } : basicAttackRangeCalc(overriddenValue.basicAttackRange)
    }
}