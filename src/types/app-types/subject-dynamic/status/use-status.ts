import * as React from "react";
import { SubjectConfig } from "../config/type";
import { Status } from "./type";
import { BaseStatus, LevelUpStatus, WeaponMasteryStatus } from "app-types/subject-static";
import { EquipmentStatusDictionary, EquipmentStatusValueKey } from "app-types/equipment";
import Decimal from "decimal.js";
import { BaseBasicAttackRange, BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, MovementSpeedPerMastery, SkillReductionPerMastery } from "./standard-values";
import { WeaponTypeID, WeaponTypeStatus } from "app-types/equipment/weapon";
import { AddComponent, AddComponentMovementSpeed, StatusValueDefault } from "./value/type";
import { Adaptive, EquipmentCombined, EquipmentConstant, EquipmentLevelDependent, Mastery, StatusValueComponent, SubjectStatus, WeaponBasedValue } from "./value/components";
import { SubjectStatusOverrideDictionary, SubjectSummonInfoDictionary } from "@app/ingame-params/subjects/dictionary";
import { StateProps } from "@app/util/state";
import { useState } from "react";

export function useStatus(config: SubjectConfig): [Status, StateProps<number>] {
    const baseStatus = React.useMemo(() => BaseStatus[config.subject], [config.subject]);
    const levelupStatus = React.useMemo(() => LevelUpStatus[config.subject], [config.subject]);
    const equipmentStatus = React.useMemo(() => 
        Object.values(config.equipment)
            .filter((id): id is number => id !== null)
            .map(id => EquipmentStatusDictionary[id])
    , [config.equipment]);

    const sumEquipmentStatus = (key: EquipmentStatusValueKey): Decimal | undefined => {
        return equipmentStatus
            .map(s => s[key])
            .filter((v): v is Decimal => v != undefined)
            .reduce((prev, current) => (prev ?? new Decimal(0)).add(current), undefined as Decimal | undefined);
    }

    const maxEquipmentStatus = (key: EquipmentStatusValueKey): Decimal | undefined => {
        return equipmentStatus
            .map(s => s[key])
            .filter((v): v is Decimal => v != undefined)
            .reduce((prev, current) => Decimal.max(prev ?? 0, current), undefined as Decimal | undefined);
    }

    const [weaponType, weaponBaseStatus] = React.useMemo(() => {
        if (config.equipment.Weapon == null) return [undefined, undefined];

        const type = EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID;
        const weaponBaseStatus = WeaponTypeStatus[type];
        return [type, weaponBaseStatus];
    }, [config.equipment.Weapon]);

    const masteryStatus = React.useMemo(() => {
        if (weaponType == undefined) return undefined;        
        return WeaponMasteryStatus[config.subject][weaponType];
    }, [config.subject, weaponType]);

    const adaptive = sumEquipmentStatus("adaptiveForce");
    const cooldownLimit = maxEquipmentStatus("uniqueCooldownLimit")

    const status: Status = {
        // toughness
        maxHp: AddComponent(0,
            SubjectStatus(baseStatus.maxHp, config.level, levelupStatus.maxHp),
            EquipmentCombined(sumEquipmentStatus("maxHp"), config.level, sumEquipmentStatus("maxHpByLv"))
        ),
        hpRegen: AddComponent(2,
            SubjectStatus(baseStatus.hpRegen, config.level, levelupStatus.hpRegen),
            EquipmentConstant("mul", sumEquipmentStatus("hpRegenRatio"))
        ),
        defense: AddComponent(0,
            SubjectStatus(baseStatus.defense, config.level, levelupStatus.defense),
            EquipmentConstant("sum", sumEquipmentStatus("defense"))
        ),
        preventBasicAttackDamaged: StatusValueDefault,
        preventBasicAttackDamagedRatio: AddComponent(1,
            Mastery("sum", config.defenseMastery, BasicAttackReductionPerMastery)
        ),
        preventSkillDamagedRatio: AddComponent(1,
            Mastery("sum", config.defenseMastery, SkillReductionPerMastery),
            EquipmentConstant("sum", sumEquipmentStatus("preventSkillDamagedRatio"))
        ),

        // sp
        maxSp: AddComponent(0,
            SubjectStatus(baseStatus.maxSp, config.level, levelupStatus.maxSp),
            EquipmentConstant("sum", sumEquipmentStatus("maxSp"))            
        ),
        spRegen: AddComponent(2,
            SubjectStatus(baseStatus.spRegen, config.level, levelupStatus.spRegen),
            EquipmentConstant("mul", sumEquipmentStatus("spRegenRatio"))
        ),

        // basic attack
        attackPower: AddComponent(0,
            SubjectStatus(baseStatus.attackPower, config.level, levelupStatus.attackPower),
            EquipmentCombined(sumEquipmentStatus("attackPower"), config.level, sumEquipmentStatus("attackPowerByLv")),
            masteryStatus?.type != "skill_amp" ? Adaptive("equipment", "app.adaptive-equipment", "attack", adaptive) : undefined,
            masteryStatus?.type == "attack_power" ? Mastery("sum", config.weaponMastery, masteryStatus.value) : undefined
        ),
        increaseBasicAttackDamageRatio: AddComponent(1,
            EquipmentLevelDependent(config.level, sumEquipmentStatus("increaseBasicAttackDamageRatioByLv")),
            masteryStatus?.type == "basic_attack_amp" ? Mastery("sum", config.weaponMastery, masteryStatus.value) : undefined
        ),
        attackSpeed: AddComponent(2,
            WeaponBasedValue(baseStatus.attackSpeed, weaponBaseStatus?.attackSpeed),
            EquipmentConstant("mul", sumEquipmentStatus("attackSpeedRatio")),
            masteryStatus ? Mastery("mul", config.weaponMastery, masteryStatus.attackSpeed) : undefined
        ),
        criticalStrikeChance: AddComponent({ ...StatusValueDefault, max: 100 },
            EquipmentConstant("sum", sumEquipmentStatus("criticalStrikeChance"))
        ),
        criticalStrikeDamage: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("criticalStrikeDamage"))
        ),

        // skill
        skillAmp: AddComponent(0,
            EquipmentCombined(sumEquipmentStatus("skillAmp"), config.level, sumEquipmentStatus("skillAmpByLevel")),
            masteryStatus?.type == "skill_amp" ? Adaptive("equipment", "app.adaptive-equipment", "amp", adaptive) : undefined,
            EquipmentConstant("mul", maxEquipmentStatus("uniqueSkillAmpRatio")),
            masteryStatus?.type == "skill_amp" ? Mastery("mul", config.weaponMastery, masteryStatus.value) : undefined
        ),
        cooldownReduction: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("cooldownReduction")?.clamp(0, new Decimal(BaseCooldownCap).add(cooldownLimit ?? 0))),
        ),
        cooldownLimit: AddComponent(0, EquipmentConstant("sum", cooldownLimit)),

        // penetration
        penetrationDefense: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("penetrationDefense"))
        ),
        penetrationDefenseRatio: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("penetrationDefenseRatio"))
        ),

        // heal
        lifeSteal: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("lifeSteal"))
        ),
        normalLifeSteal: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("normalLifeSteal"))
        ),
        healerGiveHpHealRatio: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("healerGiveHpHealRatio"))
        ),

        // misc
        tenacity: AddComponent(0,
            EquipmentConstant("sum", maxEquipmentStatus("uniqueTenacity"))
        ),
        moveSpeed: AddComponentMovementSpeed(undefined,
            SubjectStatus(baseStatus.moveSpeed, config.level, undefined),
            (() => {
                const eqConst = EquipmentConstant("sum", sumEquipmentStatus("moveSpeed"));
                if (eqConst == undefined) return undefined;
                return {
                    ...eqConst,
                    intlID: "status.equipment-constant"
                }
            })(),
            Mastery("sum", config.movementMastery, MovementSpeedPerMastery),
            (() => {
                const eqRatio = EquipmentConstant("mul", sumEquipmentStatus("moveSpeedRatio"));
                if (eqRatio == undefined) return undefined;
                return {
                    ...eqRatio,
                    intlID: "status.equipment-ratio"
                }
            })()
        ),
        slowResist: AddComponent(0,
            EquipmentConstant("sum", sumEquipmentStatus("slowResistRatio"))
        ),
        sightRange: AddComponent(1,
            SubjectStatus(BaseVision, config.level, undefined),
            EquipmentConstant("sum", sumEquipmentStatus("sightRange"))
        ),
        attackRange: AddComponent(1,
            WeaponBasedValue(BaseBasicAttackRange, weaponBaseStatus?.range),
            EquipmentConstant("sum", maxEquipmentStatus("uniqueAttackRange"))
        )
    }

    const overrideFunc = SubjectStatusOverrideDictionary[config.subject];
    const hp = useState(status.maxHp.calculatedValue.toNumber());
    React.useEffect(() => {
        if (status.maxHp.calculatedValue.lessThan(hp[0])) {
            hp[1](status.maxHp.calculatedValue.toNumber())
        }
    }, [status.maxHp])

    const finalStatus = overrideFunc ? overrideFunc(status, config, hp[0]) : status;
    const summoned = React.useMemo(() => SubjectSummonInfoDictionary[config.subject], [config.subject]);

    return [ {
        ...finalStatus,
        summoned: summoned?.map(s => ({
            status: s.status(finalStatus, config),
            nameIntlID: s.nameIntlID
        }))
    }, hp ];
}