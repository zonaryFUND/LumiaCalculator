import Decimal from "decimal.js";
import { WeaponTypeID } from "./weapon";
import { ArmorTypeID } from "./armor";
import { ValueRatio } from "app-types/value-ratio";
import { EquipmentID } from "./id";

/**
 * 装備の等級（英雄等級（紫）以上にのみ対応）
 */
export type Tier = "Epic" | "Legend" | "Mythic";

/**
 * 装備に設定されたステータスDictionaryの全Key
 * Nimble APIのレスポンスで設定されたものと一致させている
 * APIレスポンスのKeyのうち、現在使われていないステータスに対応するものはコメントアウトされる
 */
export const EquipmentStatusKeys = [
    "attackPower",
    "attackPowerByLv",
    "defense",
    // defenseByLv,
    "skillAmp",
    "skillAmpByLevel",
    "skillAmpRatio",
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
    // cooldownLimit
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
    // "preventSkillDamagedRatio",
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
    "uniqueSkillAmpRatio",
    "ultCooldownReduction",
    "weaponCooldownReduction",
    "tacticalCooldownReduction"
] as const;

/**
 * 装備に設定されたステータスのKey型
 */
export type EquipmentStatusValueKey = typeof EquipmentStatusKeys[number]

/**
 * 装備ステータスKeyのうち、その値をツールチップ等で％表記すべきもの
 */
export const PercentExpressedEquipmentStatusKeys: EquipmentStatusValueKey[] = EquipmentStatusKeys.filter(key => 
    key.includes("Ratio") || 
    key.includes("criticalStrike") ||
    key.includes("ifeSteal") ||
    key == "uniqueTenacity"
);

/**
 * 装備に付与された固有スキルの定義情報
 * 同一のアイテムスキルが複数のスキルに付与されており、かつそのダメージ量やその他効果量が装備ごとに異なることがある場合、その量が格納される
 */
export type EquipmentSkill = {
    skillCode: number
    name: string
    dmg?: ValueRatio | {melee: ValueRatio, range: ValueRatio}
    values?: Record<string, unknown>
}

/**
 * 装備のステータス、固有スキルなどの全情報
 */
export type EquipmentStatus = {[key in EquipmentStatusValueKey]?: Decimal} & {
    type: WeaponTypeID | ArmorTypeID
    itemGrade: Tier
    david?: {
        to?: EquipmentID
        from?: EquipmentID
    }
    shard?: "blue" | "red"
    skill?: EquipmentSkill[]
}
