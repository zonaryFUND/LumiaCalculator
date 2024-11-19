import { useMemo } from "react";
import { SubjectConfig } from "../config/type";
import { Status, StatusBeforeCalculation } from "./type";
import { BaseStatus, LevelUpStatus, WeaponMasteryStatus } from "app-types/subject-static";
import { EquipmentStatus, EquipmentStatusDictionary } from "app-types/equipment";
import Decimal from "decimal.js";
import { standardCalc } from "./standard-calculation";
import { maxHPCalc } from "./maxhp-calclation"
import { BaseBasicAttackRange, BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, MovementSpeedPerMastery, SkillReductionPerMastery } from "./standard-values";
import { defenseMasteryCalc } from "./defenseMasteryCalc";
import { attackCalc } from "./attack-calculation";
import { basicAttackAmpCalc } from "./basic-attack-amp-calculation";
import { attackSpeedCalc } from "./attack-speed-calculation";
import { WeaponTypeID, WeaponTypeStatus } from "app-types/equipment/weapon";
import { movementSpeedSpeedCalc } from "./movement-speed-calculation";
import { basicAttackRangeCalc } from "./basic-attack-range-calculation";
import { SummonedStatus } from "components/subjects/summoned-status";
import { defenseCalc } from "./defense-calculation";
import { SubjectStatusOverrideDictionary } from "components/subjects/dictionary";

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
    const [baseStatusValues, levelupStatusValues] = useMemo(() => {
        return [
            BaseStatus[config.subject],
            LevelUpStatus[config.subject]
        ];
    }, [config.subject]);

    const equipments = useMemo(() => Object.values(config.equipment)
        .filter((id): id is number => id !== null)
        .map(id => EquipmentStatusDictionary[id])
    , [config.equipment])

    const [weaponType, weaponBaseStatus] = useMemo(() => {
        if (config.equipment.weapon == null) return [undefined, undefined];

        const type = EquipmentStatusDictionary[config.equipment.weapon].type as WeaponTypeID;
        const weaponBaseStatus = WeaponTypeStatus[type];
        return [type, weaponBaseStatus];
    }, [config.equipment.weapon]);

    const masteryFactor = useMemo(() => {
        if (weaponType == undefined) return undefined;        
        return WeaponMasteryStatus[config.subject][weaponType];
    }, [config.subject, weaponType]);

    const equipmentValue = (constKey: keyof EquipmentStatus, perLevel?: keyof EquipmentStatus) => {
        const constant = sumEquipmentStatus(constKey, equipments);
        if (constant || perLevel) {
            return { constant, perLevel: perLevel == undefined ? undefined : sumEquipmentStatus(perLevel, equipments) };
        } else {
            return undefined;
        }
    }

    const hpRegenEquipment = (() => {
        const value = sumEquipmentStatus("hpRegenRatio", equipments);
        return value ? { ratio: value } : undefined;
    })();

    const spRegenEquipment = (() => {
        const value = sumEquipmentStatus("spRegenRatio", equipments);
        return value ? { ratio: value } : undefined;
    })();

    const attackSpeedEquipment = sumEquipmentStatus("attackSpeedRatio", equipments);
    const cdrCap = maxEquipmentStatus("uniqueCooldownLimit", equipments) ?? new Decimal(0);
    const movementSpeedEquipment = (() => {
        const value = sumEquipmentStatus("moveSpeed", equipments);
        return value ?  { constant: value } : undefined;
    })();
    const visionEquipment = (() => {
        const value = maxEquipmentStatus("sightRange", equipments);
        return value ? { constant: value } : undefined;
    })();
    const basicAttackRangeEquipment = maxEquipmentStatus("uniqueAttackRange", equipments);
    const criticalChanceEquipment = sumEquipmentStatus("criticalStrikeChance", equipments);

    const adaptive = sumEquipmentStatus("adaptiveForce", equipments);
    const armorPenetrationRatio = sumEquipmentStatus("penetrationDefenseRatio", equipments);

    const basicAttackAmpEquipment = sumEquipmentStatus("increaseBasicAttackDamageRatioByLv", equipments);

    const baseValue: StatusBeforeCalculation = {
        maxHP: {
            base: baseStatusValues.maxHp,
            perLevel: levelupStatusValues.maxHp,
            equipment: equipmentValue("maxHp", "maxHpByLv"),
        },
        hpReg: {
            base: baseStatusValues.hpRegen,
            perLevel: levelupStatusValues.hpRegen,
            equipment: hpRegenEquipment,
        },
        defense: {
            base: baseStatusValues.defense,
            perLevel: levelupStatusValues.defense,
            equipment: equipmentValue("defense")
        },
        maxSP: {
            base: baseStatusValues.maxSp,
            perLevel: levelupStatusValues.maxSp,
            equipment: equipmentValue("maxSp")
        },
        basicAttackReduction: {
            perMastery: {
                ratio: BasicAttackReductionPerMastery
            }
        },
        basicAttackReductionConstant: {},
        skillReduction: {
            perMastery: {
                ratio: SkillReductionPerMastery
            },
            equipment: equipmentValue("preventSkillDamagedRatio")
        },
        spReg: {
            base: baseStatusValues.spRegen,
            perLevel: levelupStatusValues.spRegen,
            equipment: spRegenEquipment,
        },
        attackPower: {
            base: baseStatusValues.attackPower,
            perLevel: levelupStatusValues.attackPower,
            equipment: {
                ...equipmentValue("attackPower", "attackPowerByLv"),
                adaptive: masteryFactor?.type == "attack_power" || masteryFactor?.type == "basic_attack_amp" ?
                    adaptive : undefined
            },
            perMastery: masteryFactor?.type == "attack_power" ? {
                value: masteryFactor.value
            } : undefined
        },
        basicAttackAmp: {
            perMastery: masteryFactor?.type == "basic_attack_amp" ? {
                ratio: masteryFactor.value
            } : undefined,
            equipment: basicAttackAmpEquipment ? {
                perLevel: basicAttackAmpEquipment
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
            calculatedValue: sumEquipmentStatus("criticalStrikeDamage", equipments) ?? new Decimal(0)
        },
        skillAmp: {
            equipment: {
                ...equipmentValue("skillAmp", "skillAmpByLv"),
                ratio: maxEquipmentStatus("uniqueSkillAmpRatio", equipments),
                adaptive: masteryFactor?.type == "skill_amp" ? adaptive?.times(2) : undefined
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
        armorPenetrationRatio: {
            equipment: {
                constant: armorPenetrationRatio ?? new Decimal(0)
            },
            calculatedValue: armorPenetrationRatio ?? new Decimal(0),
        },
        lifeSteal: {},
        omnisyphon: {},
        healPower: {},
        tenacity: {},
        movementSpeed: {
            base: baseStatusValues.moveSpeed,
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

    const overrideFunc = useMemo(() => SubjectStatusOverrideDictionary[config.subject], [config.subject]);
    const overriddenValue = overrideFunc ? overrideFunc(baseValue, config) : baseValue;    

    const calculated: Status = {
        maxHP: maxHPCalc(overriddenValue.maxHP, {level: config.level}),
        hpReg: standardCalc(overriddenValue.hpReg, {level: config.level}, 2),
        defense: defenseCalc(overriddenValue.defense, config.level),
        maxSP: standardCalc(overriddenValue.maxSP, {level: config.level}, 0),
        basicAttackReduction: defenseMasteryCalc(overriddenValue.basicAttackReduction, {mastery: config.defenseMastery}),
        basicAttackReductionConstant: standardCalc(overriddenValue.basicAttackReductionConstant, {}, 0),
        skillReduction: defenseMasteryCalc(overriddenValue.skillReduction, {mastery: config.defenseMastery}),
        spReg: standardCalc(overriddenValue.spReg, {level: config.level}, 2),
        attackPower: attackCalc(overriddenValue.attackPower, {level: config.level, mastery: config.weaponMastery}),
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
        skillAmp: standardCalc(overriddenValue.skillAmp, {level: config.level, mastery: config.weaponMastery}, 0),
        cooldownReduction: overriddenValue.cooldownReduction as any,
        armorPenetration: {
            calculatedValue: sumEquipmentStatus("penetrationDefense", equipments) ?? new Decimal(0)
        },
        armorPenetrationRatio: standardCalc(overriddenValue.armorPenetrationRatio, {}, 0),
        lifeSteal: {
            calculatedValue: sumEquipmentStatus("lifeSteal", equipments) ?? new Decimal(0)
        },
        omnisyphon: {
            calculatedValue: sumEquipmentStatus("normalLifeSteal", equipments) ?? new Decimal(0)
        },
        healPower: {
            calculatedValue: sumEquipmentStatus("healerGiveHpHealRatio", equipments) ?? new Decimal(0)
        },
        tenacity: {
            calculatedValue: maxEquipmentStatus("uniqueTenacity", equipments) ?? new Decimal(0)
        },
        movementSpeed: movementSpeedSpeedCalc(overriddenValue.movementSpeed, {mastery: config.movementMastery}),
        visionRange: standardCalc(overriddenValue.visionRange, {}, 2),
        basicAttackRange: overriddenValue.basicAttackRange.calculatedValue ? {
            ...overriddenValue.basicAttackRange,
            calculatedValue: overriddenValue.basicAttackRange.calculatedValue
        } : basicAttackRangeCalc(overriddenValue.basicAttackRange)
    }

    const summonedStatusFunc = useMemo(() => SummonedStatus[config.subject]?.status, [config.subject]);

    return {
        ...calculated,
        summonedStatus: summonedStatusFunc ? summonedStatusFunc(calculated, config) : undefined
    }
}