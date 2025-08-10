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
 * 装備品のステータスのうち、固有スキルや等級などの情報を除く、数値ステータスの部分。
 * 
 * NimbleNeuron APIレスポンスで定義されたKeyのうち、現Verのゲームで用いられていない数値はコメントアウトされている。
 */
export type EquipmentBaseStatus = {
    /**
     * 攻撃力
     */
    attackPower: Decimal
    
    /**
     * レベル比例攻撃力
     */
    
    attackPowerByLv: Decimal
    /**
     * 防御力
     */
    
    defense: Decimal

    // defenseByLv

    /**
     * スキル増幅
     */
    skillAmp: Decimal
    
    /**
     * レベル比例スキル増幅
     */
    skillAmpByLevel: Decimal
    
    /**
     * スキル増幅（％表記）
     */
    skillAmpRatio: Decimal

    // skillAmpRatioByLevel

    /**
     * 適応型能力
     */
    adaptiveForce: Decimal

    // "adaptiveForceByLevel",

    /**
     * 最大体力
     */
    maxHp: Decimal

    /**
     * レベル比例最大体力
     */
    maxHpByLv: Decimal

    /**
     * 最大スタミナ
     */
    maxSp: Decimal

    /**
     * 体力再生（％表記）
     */
    hpRegenRatio: Decimal

    // hpRegen

    /**
     * スタミナ再生（％表記）
     */
    spRegenRatio: Decimal

    // spRegen

    /**
     * 攻撃速度（％表記）
     */
    attackSpeedRatio: Decimal

    // attackSpeedRatioByLv

    /**
     * 致命打確率（％表記）
     */
    criticalStrikeChance: Decimal

    /**
     * 致命打ダメージ上昇量（％表記）
     */
    criticalStrikeDamage: Decimal

    // preventCriticalStrikeDamaged

    /**
     * クールダウン減少
     */
    cooldownReduction: Decimal

    // cooldownLimit

    /**
     * ダメージ吸血
     */
    lifeSteal: Decimal
    
    /**
     * 生命力吸収
     */
    normalLifeSteal: Decimal

    // skillLifeSteal

    /**
     * 移動速度
     */
    moveSpeed: Decimal

    /**
     * 移動速度（％表記）
     */
    moveSpeedRatio: Decimal

    // moveSpeedOutOfCombat

    /**
     * 視界範囲
     */
    sightRange: Decimal

    // attackRange?: Decimal // unique only
    // increaseBasicAttackDamage?: Decimal
    // increaseBasicAttackDamageByLv?: Decimal
    // preventBasicAttackDamaged?: Decimal
    // preventBasicAttackDamagedByLv?: Decimal
    // preventBasicAttackDamagedRatio?: Decimal
    // preventBasicAttackDamagedRatioByLv?: Decimal
    // increaseBasicAttackDamageRatio?: Decimal

    /**
     * レベル比例基本攻撃増幅（％表記）
     */
    increaseBasicAttackDamageRatioByLv: Decimal

    // preventSkillDamaged?: Decimal
    // preventSkillDamagedByLv?: Decimal
    // "preventSkillDamagedRatio",
    // preventSkillDamagedRatioByLv": Decimal

    /**
     * 防御貫通
     */
    penetrationDefense: Decimal

    /**
     * 防御貫通（％表記）
     */
    penetrationDefenseRatio: Decimal

    // trapDamageReduce?: Decimal
    // trapDamageReduceRatio?: Decimal

    /**
     * 移動速度減少耐性（％表記）
     */
    slowResistRatio: Decimal

    // hpHealedIncreaseRatio?: Decimal // incoming heal only, it is deprecated

    /**
     * 与える回復増加（％表記）
     */
    healerGiveHpHealRatio: Decimal

    /**
     * （固有）基本攻撃射程距離
     */
    uniqueAttackRange: Decimal

    // uniqueHpHealedIncreaseRatio?: Decimal
    // uniqueCooldownLimit: Decimal

    /**
     * （固有）妨害耐性（％表記）
     */
    uniqueTenacity: Decimal

    // uniqueMoveSpeed
    // uniquePenetrationDefense
    // uniquePenetrationDefenseRatio
    // uniqueLifeSteal

    /**
     * （固有）スキル増幅（％表記）
     */
    uniqueSkillAmpRatio: Decimal

    /**
     * 究極技クールダウン減少
     */
    ultCooldownReduction: Decimal

    /**
     * 武器スキルクールダウン減少
     */
    weaponCooldownReduction: Decimal

    /**
     * 戦術スキルクールダウン減少
     */
    tacticalCooldownReduction: Decimal
}

/**
 * ある装備ステータスKeyがパーセント表記されるべきものかどうか
 * パーセント表記されるステータスはNimble APIレスポンスJSONにおいて小数表記されており、ゲーム内表記に合わせるには100倍する必要がある
 * 
 * @param key 装備ステータスの数値に対応するKey
 * @returns 
 */
export function IsPercentExpressedEquipmentStatusKey(key: keyof EquipmentBaseStatus): boolean {
    return key.includes("Ratio") ||
        key.includes("criticalStrike") ||
        key.includes("ifeSteal") ||
        key == "uniqueTenacity"
}

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
export type EquipmentStatus = Partial<EquipmentBaseStatus> & {
    type: WeaponTypeID | ArmorTypeID
    itemGrade: Tier
    shard?: "blue" | "red"
    skill?: EquipmentSkill[]
}
