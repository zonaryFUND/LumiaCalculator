import { ValueOrigin, ValueRatio } from "core/value-ratio"
import { BasicAttackType, MiscValueType, SkillDamageType, SupportType, TrueDamageType } from "./value-type"
import Decimal from "decimal.js";

/**
 * ダメージや回復量の計算の最後に乗算される量
 * 
 * 特定の条件でダメージが定数倍になったり、複数回攻撃の全ヒット時ダメージを表示する際に用いる
 * 
 * 複数の乗算要因がある場合、それらすべての要素を含む配列として定義する
 * 
 * - number要素　固定値の倍率
 * - number[]要素　スキルレベルに依存する倍率
 * - オブジェクト要素　その倍率が何に起因するものなのか明示的に表記したい場合に用いる
 */
export type ValueTableUnitMultiplier = number | number[] | {
    /**
     * 倍率の要因を表す文字列（Intlを通す）
     */
    label?: string,

    /**
     * 具体的な倍率値（配列ならスキルレベル依存）
     */
    value: number | number[]
}[]

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
     * 
     * Intlに渡され、また配列内では固有である必要がある
     */
    label: string

    /**
     * 効果量を表すレシオ値構造体
     */
    value: ValueRatio

    /**
     * ダメージやヒールなどの効果の発生源
     */
    origin: ValueOrigin

    // if undefined, it means skill damage (for conveneince)
    /**
     * 効果の種類
     * 
     * - 基本攻撃ダメージ
     * - スキルダメージ（undefinedなら自動的にこれとみなされる）
     * - 固定ダメージ
     * - ヒールまたはシールド量
     * - その他（ステータス上昇など）
     */
    type?: BasicAttackType | SkillDamageType | TrueDamageType | SupportType | MiscValueType

    /**
     * 効果量計算の後に乗算される量
     */
    multiplier?: ValueTableUnitMultiplier

    /**
     * 基本攻撃によって起動されるかどうか
     * 
     * 意念など、AAによって最終ダメージが発生するアイテムスキル等で`true`にする
     * 
     * 実験体スキル（雪Qなど）の場合、辞書定義で最初からAAとスキルを分けているのでこのフィールドを代入する必要はない
     */
    triggeredOnBasicAttack?: boolean

    /**
     * 与えたダメージに比例する回復量を得るスキルの場合に代入する
     * 
     * ダメージ量自体の表示項目ではこれを`undefined`にして、回復量を示す別項目でここに値を代入する
     * 
     * - number　`value`の定数倍（％）の回復量
     * - number[]　スキルレベルに依存する`value`の定数倍（％）の回復量
     * - DamageDependentHealStrategy　その他特別な計算が必要である場合の回復量
     */
    damageDependentHeal?: number | number[] | DamageDependentHealStrategy
}
