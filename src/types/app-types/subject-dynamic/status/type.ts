import Decimal from "decimal.js"
import { CooldownStatusValue, MovementSpeedValue, StatusValue } from "./value-component/type"
import { StatusValueComponent } from "./value-component/component"

/**
 * ステータス計算のために事前に作成する各パラメータ情報構造体
 */
export type ComponentStatusValue = {
    /**
     * 表示桁数
     */
    digit: number

    /**
     * 攻撃速度などシステム的な上限が存在する場合、その最大値
     */
    max?: number

    /**
     * そのパラメータの全構成要素
     */
    components: StatusValueComponent[]
}

/**
 * ステータス計算のための各パラメータの構成単位をまとめた中間構造体
 */
export type ComponentStatus = {
    maxHp: ComponentStatusValue
    hpRegen: ComponentStatusValue
    defense: ComponentStatusValue
    preventBasicAttackDamagedRatio: ComponentStatusValue
    preventBasicAttackDamaged: ComponentStatusValue // hidden status for calculation(garnet T)
    preventSkillDamagedRatio: ComponentStatusValue
    attackPower: ComponentStatusValue
    increaseBasicAttackDamageRatio: ComponentStatusValue
    attackSpeed: ComponentStatusValue
    criticalStrikeChance: ComponentStatusValue
    criticalStrikeDamage: ComponentStatusValue
    skillAmp: ComponentStatusValue
    cooldownReduction: ComponentStatusValue
    ultCooldownReduction: ComponentStatusValue
    tacticalSkillCooldownReduction: ComponentStatusValue
    penetrationDefense: ComponentStatusValue
    penetrationDefenseRatio: ComponentStatusValue
    lifeSteal: ComponentStatusValue
    normalLifeSteal: ComponentStatusValue
    healerGiveHpHealRatio: ComponentStatusValue
    tenacity: ComponentStatusValue
    moveSpeed: ComponentStatusValue
    slowResist: ComponentStatusValue
    sightRange: ComponentStatusValue
    attackRange: ComponentStatusValue
}

/**
 * 実験体の最終ステータス
 */
export type Status = Record<keyof Omit<ComponentStatus, "cooldownReduction" | "ultCooldownReduction" | "tacticalSkillCooldownReduction" | "moveSpeed">, StatusValue> & {
    cooldownReduction: CooldownStatusValue
    ultCooldownReduction: CooldownStatusValue
    tacticalSkillCooldownReduction: CooldownStatusValue
    moveSpeed: MovementSpeedValue

    /**
     * 実験体が出現させられる召喚体の識別IDとそのステータス
     */
    summoned?: {
        nameIntlID: string
        status: SummonedStatus
    }[]
}

/**
 * 実験体が出現させられる召喚体のステータス
 */
export type SummonedStatus = {
    maxHP: Decimal
    attackPower: Decimal
    defense: Decimal
    attackSpeed: Decimal
    criticalChance: Decimal
    skillAmp: Decimal
    armorPenetration: Decimal
    armorPenetrationRatio: Decimal
}