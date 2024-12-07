import * as React from "react";
import { SubjectConfig } from "../config/type";
import { BlankStatus, Status, StatusBeforeCalculation } from "./type";
import { BaseStatus, LevelUpStatus, WeaponMasteryStatus } from "app-types/subject-static";
import { EquipmentStatus, EquipmentStatusDictionary } from "app-types/equipment";
import Decimal from "decimal.js";
import { standardCalc } from "./standard-calculation";
import { maxHPCalc } from "./maxhp-calclation"
import { BaseBasicAttackRange, BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, SkillReductionPerMastery } from "./standard-values";
import { defenseMasteryCalc } from "./defenseMasteryCalc";
import { attackCalc } from "./attack-calculation";
import { basicAttackAmpCalc } from "./basic-attack-amp-calculation";
import { attackSpeedCalc } from "./attack-speed-calculation";
import { WeaponTypeID, WeaponTypeStatus } from "app-types/equipment/weapon";
import { movementSpeedSpeedCalc } from "./movement-speed-calculation";
import { basicAttackRangeCalc } from "./basic-attack-range-calculation";
import { defenseCalc } from "./defense-calculation";
import { SubjectStatusOverrideDictionary, SubjectSummonInfoDictionary } from "@app/ingame-params/subjects/dictionary";
import { AddComponent, StatusValueDefault } from "./value/type";
import { StatusValueComponent } from "./value/components";

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
    const baseStatus = BaseStatus[config.subject];
    const levelupStatus = BaseStatus[config.subject];
    const equipmentStatus = Object.values(config.equipment)
        .filter((id): id is number => id !== null)
        .map(id => EquipmentStatusDictionary[id]);

    return Object.keys(BlankStatus).reduce((prev, key) => {
        const components: (StatusValueComponent | undefined)[] = [
            baseStatus[key] != undefined ? { origin: "subject-status", calculationType: "sum", value: baseStatus[key] } : undefined
        ]

        return {
            ...prev,
            [key]: 0
        }
    }, BlankStatus);

/*
    const [baseStatusValues, levelupStatusValues] = React.useMemo(() => {
        return [
            BaseStatus[config.subject],
            LevelUpStatus[config.subject]
        ];
    }, [config.subject]);

    const equipments = React.useMemo(() => Object.values(config.equipment)
        .filter((id): id is number => id !== null)
        .map(id => EquipmentStatusDictionary[id])
    , [config.equipment])

    const [weaponType, weaponBaseStatus] = React.useMemo(() => {
        if (config.equipment.Weapon == null) return [undefined, undefined];

        const type = EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID;
        const weaponBaseStatus = WeaponTypeStatus[type];
        return [type, weaponBaseStatus];
    }, [config.equipment.Weapon]);

    const masteryFactor = React.useMemo(() => {
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
        hpRegen: {
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
        preventBasicAttackDamagedRatio: {
            perMastery: {
                ratio: BasicAttackReductionPerMastery
            }
        },
        preventBasicAttackDamaged: {},
        preventSkillDamagedRatio: {
            perMastery: {
                ratio: SkillReductionPerMastery
            },
            equipment: equipmentValue("preventSkillDamagedRatio")
        },
        spRegen: {
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
        increaseBasicAttackDamageRatio: {
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
        criticalStrikeChance: {
            equipment: criticalChanceEquipment ? {
                constant: criticalChanceEquipment.clamp(0, 100)
            } : undefined
        },
        criticalStrikeDamage: {
            calculatedValue: sumEquipmentStatus("criticalStrikeDamage", equipments) ?? new Decimal(0)
        },
        skillAmp: {
            equipment: {
                ...equipmentValue("skillAmp", "skillAmpByLevel"),
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
        penetrationDefense: {},
        penetrationDefenseRatio: {
            equipment: {
                constant: armorPenetrationRatio ?? new Decimal(0)
            },
            calculatedValue: armorPenetrationRatio ?? new Decimal(0),
        },
        normalLifeSteal: {},
        lifeSteal: {},
        healerGiveHpHealRatio: {},
        tenacity: {
            equipment: {
                constant: maxEquipmentStatus("uniqueTenacity", equipments) ?? new Decimal(0)
            }
        },
        moveSpeed: {
            base: baseStatusValues.moveSpeed,
            equipment: movementSpeedEquipment
        },
        slowResist: {},
        sightRange: {
            base: BaseVision,
            equipment: visionEquipment
        },
        attackRange: {
            base: BaseBasicAttackRange,
            equipment: weaponBaseStatus ? {
                constant: weaponBaseStatus.range,
                ratio: basicAttackRangeEquipment    // This value is not "ratio", but is stored here for convenience
            } : undefined
        }
    }

    const overrideFunc = React.useMemo(() => SubjectStatusOverrideDictionary[config.subject], [config.subject]);
    const overriddenValue = overrideFunc ? overrideFunc(baseValue, config) : baseValue;    

    const calculated: Status = {
        maxHP: maxHPCalc(overriddenValue.maxHP, {level: config.level}),
        hpRegen: standardCalc(overriddenValue.hpRegen, {level: config.level}, 2),
        defense: defenseCalc(overriddenValue.defense, config.level),
        maxSP: standardCalc(overriddenValue.maxSP, {level: config.level}, 0),
        preventBasicAttackDamagedRatio: defenseMasteryCalc(overriddenValue.preventBasicAttackDamagedRatio, {mastery: config.defenseMastery}),
        preventBasicAttackDamaged: standardCalc(overriddenValue.preventBasicAttackDamaged, {}, 0),
        preventSkillDamagedRatio: defenseMasteryCalc(overriddenValue.preventSkillDamagedRatio, {mastery: config.defenseMastery}),
        spRegen: standardCalc(overriddenValue.spRegen, {level: config.level}, 2),
        attackPower: attackCalc(overriddenValue.attackPower, {level: config.level, mastery: config.weaponMastery}),
        increaseBasicAttackDamageRatio: basicAttackAmpCalc(overriddenValue.increaseBasicAttackDamageRatio, {level: config.level, mastery: config.weaponMastery}),
        attackSpeed: overriddenValue.attackSpeed.calculatedValue ? {
            ...overriddenValue.attackSpeed,
            calculatedValue: overriddenValue.attackSpeed.calculatedValue
        } : attackSpeedCalc(overriddenValue.attackSpeed, {mastery: config.weaponMastery}),
        criticalStrikeChance: (() => {
            const calculated = standardCalc(overriddenValue.criticalStrikeChance, {}, 0);
            return {
                ...calculated,
                calculatedValue: calculated.calculatedValue.clamp(0, 100)
            }
        })(),
        criticalStrikeDamage: overriddenValue.criticalStrikeDamage as any,
        skillAmp: standardCalc(overriddenValue.skillAmp, {level: config.level, mastery: config.weaponMastery}, 0),
        cooldownReduction: overriddenValue.cooldownReduction as any,
        penetrationDefense: {
            calculatedValue: sumEquipmentStatus("penetrationDefense", equipments) ?? new Decimal(0)
        },
        penetrationDefenseRatio: standardCalc(overriddenValue.penetrationDefenseRatio, {}, 0),
        normalLifeSteal: {
            calculatedValue: sumEquipmentStatus("lifeSteal", equipments) ?? new Decimal(0)
        },
        lifeSteal: {
            calculatedValue: sumEquipmentStatus("normalLifeSteal", equipments) ?? new Decimal(0)
        },
        healerGiveHpHealRatio: {
            calculatedValue: sumEquipmentStatus("healerGiveHpHealRatio", equipments) ?? new Decimal(0)
        },
        tenacity: standardCalc(overriddenValue.tenacity, {}, 0),
        moveSpeed: movementSpeedSpeedCalc(overriddenValue.moveSpeed, {mastery: config.movementMastery}),
        slowResist: {
            calculatedValue: sumEquipmentStatus("slowResistRatio", equipments) ?? new Decimal(0)
        },
        sightRange: standardCalc(overriddenValue.sightRange, {}, 2),
        attackRange: overriddenValue.attackRange.calculatedValue ? {
            ...overriddenValue.attackRange,
            calculatedValue: overriddenValue.attackRange.calculatedValue
        } : basicAttackRangeCalc(overriddenValue.attackRange)
    }

    const summoned = React.useMemo(() => SubjectSummonInfoDictionary[config.subject], [config.subject]);

    return {
        ...calculated,
        summoned: summoned?.map(s => ({
            status: s.status(calculated, config),
            nameIntlID: s.nameIntlID
        }))
    }
        */
}