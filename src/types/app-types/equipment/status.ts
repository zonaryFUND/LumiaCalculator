import Decimal from "decimal.js";
import { WeaponTypeID } from "./weapon";
import { ArmorTypeID } from "./armor";
import { ValueRatio } from "app-types/value-ratio";
import { EquipmentID } from "./id";

export type Tier = "Epic" | "Legend" | "Mythic";

export const EquipmentStatusKeys = [
    "attackPower",
    "attackPowerByLv",
    "defense",
    // defenseByLv,
    "skillAmp",
    "skillAmpByLevel",
    // skillAmpRatio
    // skillAmpRatioByLevel
    "adaptiveForce",
    // "adaptiveForceByLevel",
    "maxHp",
    "maxHpByLv",
    "maxSp",
    "hpRegenRatio",
    // hpRegen
    "spRegenRatio",
    // spRegen
    "attackSpeedRatio",
    // attackSpeedRatioByLv
    "criticalStrikeChance",
    "criticalStrikeDamage",
    // preventCriticalStrikeDamaged
    "cooldownReduction",
    // cooldownLimit // unique only
    "lifeSteal",
    "normalLifeSteal",
    // skillLifeSteal
    "moveSpeed",
    "moveSpeedRatio",
    // moveSpeedOutOfCombat
    "sightRange",
    // attackRange?: Decimal // unique only
    // increaseBasicAttackDamage?: Decimal
    // increaseBasicAttackDamageByLv?: Decimal
    // preventBasicAttackDamaged?: Decimal
    // preventBasicAttackDamagedByLv?: Decimal
    // preventBasicAttackDamagedRatio?: Decimal
    // preventBasicAttackDamagedRatioByLv?: Decimal
    // increaseBasicAttackDamageRatio?: Decimal
    "increaseBasicAttackDamageRatioByLv",
    // preventSkillDamaged?: Decimal
    // preventSkillDamagedByLv?: Decimal
    "preventSkillDamagedRatio",
    // preventSkillDamagedRatioByLv": Decimal
    "penetrationDefense",
    "penetrationDefenseRatio",
    // trapDamageReduce?: Decimal
    // trapDamageReduceRatio?: Decimal
    "slowResistRatio",
    // hpHealedIncreaseRatio?: Decimal // incoming heal only, it is deprecated
    "healerGiveHpHealRatio",
    "uniqueAttackRange",
    // uniqueHpHealedIncreaseRatio?: Decimal
    "uniqueCooldownLimit",
    "uniqueTenacity",
    // uniqueMoveSpeed
    // uniquePenetrationDefense
    // uniquePenetrationDefenseRatio
    // uniqueLifeSteal
    "uniqueSkillAmpRatio"
] as const;

export type EquipmentStatusValueKey = typeof EquipmentStatusKeys[number]

export const PercentExpressedEquipmentStatusKeys: EquipmentStatusValueKey[] = EquipmentStatusKeys.filter(key => 
    key.includes("Ratio") || 
    key.includes("criticalStrike") ||
    key.includes("ooldown") ||
    key.includes("ifeSteal") ||
    key == "uniqueTenacity"
);

export type EquipmentSkill = {
    skillCode: number
    name: string
    dmg?: ValueRatio | {melee: ValueRatio, range: ValueRatio}
    values?: Record<string, unknown>
}

export type EquipmentStatus = {[key in EquipmentStatusValueKey]?: Decimal} & {
    type: WeaponTypeID | ArmorTypeID
    itemGrade: Tier
    david?: {
        to?: EquipmentID
        from?: EquipmentID
    }
    shard?: "blue" | "red"
    ammo?: Decimal
    skill?: EquipmentSkill[]
}
