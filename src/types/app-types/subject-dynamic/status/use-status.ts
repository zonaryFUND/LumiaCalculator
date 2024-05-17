import { useMemo } from "react";
import { SubjectConfig } from "../config/type";
import { Status } from "./type";
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

    const adaptive = sumEquipmentStatus("adaptiveStatus", equipments);
    const attackWithoutAdaptive = attackCalc({
        base: baseStatusValues.attackPower,
        perLevel: baseStatusValues.apPerLevel,
        equipment: equipmentValue("attackPower", perLevelStatus.attack_power),
        perMastery: masteryFactor?.type == "attack_power" ? {
            value: masteryFactor.value
        } : undefined
    }, {level: config.level, mastery: config.weaponMastery});

    const ampWithoutAdaptive = standardCalc({
        equipment: {
            ...equipmentValue("skillAmplification", perLevelStatus.skill_amp),
            ratio: maxEquipmentStatus("ampRatio", equipments)
        },
        perMastery: masteryFactor?.type == "skill_amp" ? {
            ratio: masteryFactor.value
        } : undefined
    }, {level: config.level, mastery: config.weaponMastery}, 0);

    const addAdaptiveTo = adaptive == undefined ? undefined :
        attackWithoutAdaptive.value.greaterThanOrEqualTo(ampWithoutAdaptive.value) ? "attack" : "amp";
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

    const baseValue: Status = {
        maxHP: maxHPCalc({
            base: baseStatusValues.maxHP,
            perLevel: baseStatusValues.maxHPperLevel,
            equipment: equipmentValue("maxHP", perLevelStatus.max_hp),
        }, {level: config.level}),
        hpReg: standardCalc({
            base: baseStatusValues.hpRegeneration,
            perLevel: baseStatusValues.hpRegenPerLevel,
            equipment: hpRegenEquipment,
        }, {level: config.level}, 2),
        defense: standardCalc({
            base: baseStatusValues.armor,
            perLevel: baseStatusValues.armorPerLevel,
            equipment: equipmentValue("defense")
        }, {level: config.level}, 0),
        maxSP: standardCalc({
            base: baseStatusValues.maxSP,
            perLevel: baseStatusValues.maxSPperLevel,
            equipment: equipmentValue("maxSP")
        }, {level: config.level}, 0),
        basicAttackReduction: defenseMasteryCalc({
            perMastery: {
                ratio: BasicAttackReductionPerMastery
            }
        }, {mastery: config.defenseMastery}),
        skillReduction: defenseMasteryCalc({
            perMastery: {
                ratio: SkillReductionPerMastery
            },
            equipment: equipmentValue("skillDamageReduction")
        }, {mastery: config.defenseMastery}),
        spReg: standardCalc({
            base: baseStatusValues.spRegeneration,
            perLevel: baseStatusValues.spRegenPerLevel,
            equipment: spRegenEquipment,
        }, {level: config.level}, 2),
        attackPower: addAdaptiveTo == "attack" ? attackCalc({
            ...attackWithoutAdaptive,
            equipment: {
                ...equipmentValue("attackPower", perLevelStatus.attack_power),
                adaptive
            }
        }, {level: config.level, mastery: config.weaponMastery})
        : attackWithoutAdaptive,
        basicAttackAmp: basicAttackAmpCalc({
            perMastery: masteryFactor?.type == "basic_attack_amp" ? {
                ratio: masteryFactor.value
            } : undefined,
            equipment: perLevelStatus.aa_amp ? {
                perLevel: perLevelStatus.aa_amp
            } : undefined
        }, {level: config.level, mastery: config.weaponMastery}),
        attackSpeed: attackSpeedCalc({
            base: baseStatusValues.attackSpeed,
            equipment: weaponBaseStatus && attackSpeedEquipment ? {
                constant: weaponBaseStatus?.attackSpeed,
                ratio: attackSpeedEquipment
            } : undefined,
            perMastery: masteryFactor ? {
                ratio: masteryFactor.attackSpeed
            } : undefined
        }, {mastery: config.weaponMastery}),
        criticalChance: {
            value: sumEquipmentStatus("criticalChance", equipments) ?? new Decimal(0)
        },
        criticalDamage: {
            value: sumEquipmentStatus("criticalDamage", equipments) ?? new Decimal(0)
        },
        skillAmp: addAdaptiveTo == "amp" ? standardCalc({
            ...ampWithoutAdaptive,
            equipment: {
                ...ampWithoutAdaptive.equipment,
                adaptive: adaptive?.times(2)
            }
        }, {level: config.level, mastery: config.weaponMastery}, 0) : ampWithoutAdaptive,
        cooldownReduction: {
            cap: cdrCap,
            value: (sumEquipmentStatus("cooldownReduction", equipments) ?? new Decimal(0)).clamp(0, BaseCooldownCap.add(cdrCap))
        },
        armorPenetration: {
            value: sumEquipmentStatus("armorPenetration", equipments) ?? new Decimal(0)
        },
        armorPenetrationRatio: {
            value: sumEquipmentStatus("armorPenetrationRatio", equipments) ?? new Decimal(0)
        },
        lifeSteal: {
            value: sumEquipmentStatus("lifeSteal", equipments) ?? new Decimal(0)
        },
        omnisyphon: {
            value: sumEquipmentStatus("omnisyphon", equipments) ?? new Decimal(0)
        },
        healPower: {
            value: sumEquipmentStatus("healingPower", equipments) ?? new Decimal(0)
        },
        tenacity: {
            value: maxEquipmentStatus("tenacity", equipments) ?? new Decimal(0)
        },
        movementSpeed: movementSpeedSpeedCalc({
            base: baseStatusValues.movementSpeed,
            equipment: movementSpeedEquipment
        }, {mastery: config.movementMastery}),
        visionRange: standardCalc({
            base: BaseVision,
            equipment: visionEquipment
        }, {}, 2),
        basicAttackRange: basicAttackRangeCalc({
            base: BaseBasicAttackRange,
            equipment: weaponBaseStatus ? {
                constant: weaponBaseStatus.range,
                ratio: basicAttackRangeEquipment    // This value is not "ratio", but is stored here for convenience
            } : undefined
        })
    }

    return baseValue;
}