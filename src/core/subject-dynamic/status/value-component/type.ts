import Decimal from "decimal.js"
import { StatusValueComponent } from "./component"

/**
 * ステータスの値を表す構造体
 */
export type StatusValue = {
    /**
     * そのステータスを構成する原因、要素
     */
    components: StatusValueComponent[]

    /**
     * 「追加攻撃力」「追加最大体力」などのレシオがあるスキル数値が参照する、装備などで増加した分の値
     */
    additionalValue: Decimal

    /**
     * ステータス値のうち、単純に加算されるベース数値
     */
    sum: Decimal

    /**
     * ステータス値のうち、`sum`に掛け算される値（％表記）
     */
    multiplier: Decimal

    /**
     * 最終的に得られる表示値
     */
    calculatedValue: Decimal

    /**
     * ゲームで表示される桁数
     */
    digit: number

    /**
     * 攻撃速度など、システム的な最大値が設定されているとき、その最大値
     */
    max?: number
}

/**
 * クールダウン系ステータスの値を表す構造体
 */
export type CooldownStatusValue = {
    /**
     * そのステータスを構成する原因、要素
     */
    components: StatusValueComponent[]

    /**
     * クールダウン減少率を計算する元となるヘイスト値
     */
    rawHasteValue: Decimal

    /**
     * ％表記される最終的なクールダウン減少率
     */
    calculatedValue: Decimal
}

/**
 * 移動速度の値を表す構造体
 */
export type MovementSpeedValue = {
    /**
     * そのステータスを構成する原因、要素
     */
    components: StatusValueComponent[]

    /**
     * 補正を行ったあとの最終的な移動速度
     */
    calculatedValue: Decimal
    
    /**
     * 補正前の移動速度
     */
    rawResult: Decimal
}
