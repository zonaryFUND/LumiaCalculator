import { ValueOrigin, ValueRatio } from "app-types/value-ratio"
import { BasicAttackType, MiscValueType, SkillDamageType, SupportType, TrueDamageType } from "./value-type"
import Decimal from "decimal.js";

/**
 * 与えたダメージのｎ％分の回復を得るスキルまたは効果について、それを表現する関数
 */
export type DamageDependentHealStrategy = (props: {
    potency: Decimal,
    calculatedDamage: Decimal
}) => {
    baseValue: Decimal
    multiplier: Decimal
    heal: Decimal
};

/**
 * ダメージやヒール等の効果量を計算するために必要な要素をまとめた構造体
 */
export type DamageTableUnit = {
    /**
     * 効果の名称を表すラベル
     * Intlに渡され、また配列内では固有である必要がある
     */
    label: string

    /**
     * 
     */
    value: ValueRatio

    origin: ValueOrigin

    // if undefined, it means skill damage (for conveneince)
    type?: BasicAttackType | SkillDamageType | TrueDamageType | SupportType | MiscValueType

    multiplier?: number | number[] | {
        label?: string,
        value: number | number[]
    }[]

    triggeredOnBasicAttack?: boolean

    // heal amount dependent on the damage dealt and it is not displayed on simple page
    damageDependentHeal?: number | number[] | DamageDependentHealStrategy
}
