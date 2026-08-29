/**
 * ダメージや回復などの効果量を計算するための基礎値や各レシオ値を表す要素
 * 
 * - number型はステータスに依存しない固定値を表す（e.g. スキル増幅の50%）
 * - number[]型はスキルレベルに依存し、ステータスに依存しない固定値を表す（e.g.スキル増幅の[10%/20%/30%]）
 * - ValueRatio型はステータスの必要な要素から計算される入れ子レシオ値を表す（e.g. 対象最大体力の(ｎ＋スキル増幅のｍ％)％）
 */
export type ValueElement = number | number[] | ValueRatio

/**
 * ダメージや回復などの効果量を表す構造体
 * 
 * ゲーム内において[10/20/30/40/50](+スキル増幅の50%)のように表現される値を格納する
 */
export type ValueRatio = {
    /**
     * 基礎値
     */
    base?: ValueElement

    /**
     * レベル比例値
     */
    level?: ValueElement

    /**
     * 最大体力比例値
     */
    maxHP?: ValueElement
    
    /**
     * 追加最大体力比例値
     */
    additionalMaxHP?: ValueElement

    /**
     * 防御力比例値
     */
    defense?: ValueElement

    /**
     * 攻撃力比例値
     */
    attack?: ValueElement

    /**
     * 追加攻撃力比例値
     */
    additionalAttack?: ValueElement

    /**
     * 基本攻撃増幅（現仕様では100以外代入されない）
     */
    basicAttackAmp?: ValueElement

    /**
     * 致命打確率比例値
     */
    criticalChance?: ValueElement

    /**
     * 致命打追加ダメージ量比例値
     */
    criticalDamage?: ValueElement

    /**
     * 追加攻撃量比例値
     */
    additionalAttackSpeed?: ValueElement

    /**
     * スキル増幅比例値
     */
    amp?: ValueElement

    /**
     * 実験体固有スタック比例値
     */
    stack?: ValueElement

    /**
     * 実験体固有ゲージ比例値
     */
    gauge?: ValueElement

    /**
     * 対象最大体力比例値
     */
    targetMaxHP?: ValueElement
    
    /**
     * 対象現在体力比例値
     */
    targetHP?: ValueElement

    /**
     * 失った体力比例値
     */
    lostHP?: ValueElement

    /**
     * 対象の失った体力比例値
     */
    targetLostHP?: ValueElement
}
