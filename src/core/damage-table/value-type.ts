/**
 * 基本攻撃ダメージを表す構造体
 */
export type BasicAttackType = {
    type: "basic"

    /**
     * 致命打に関する挙動
     * 
     * - `undefined`　通常の処理（致命打確率に依存して発生し、基礎値と致命打、期待値を表記する）
     * - `"none"`　致命打が発生しない（莉央AAなど）
     * - `"confirmed"`　確定致命打（エイデンオーバーチャージAA）
     */
    critical?: "none" | "confirmed"

    /**
     * 複数弾に分かれて処理されるダメージの場合、その弾数
     * 
     * ガーネットTの軽減ロジックに影響する
     */
    hitCount?: number
}

/**
 * スキルダメージを表す構造体
 */
export type SkillDamageType = {
    type: "skill"
}

/**
 * 固定ダメージを表す構造体
 */
export type TrueDamageType = {
    type: "true"
}

/**
 * 回復・シールドを表す構造体
 */
export type SupportType = {
    /**
     * - `"heal"`　回復量
     * - `"shield"`　シールド量
     */
    type: "heal" | "shield"

    /**
     * - `"self"`　自身のみに付与される
     * - `"any"`　自身または仲間に付与される
     * - `"ally"`　仲間にのみ付与される
     */
    target: "self" | "any" | "ally"
}

/**
 * ステータス上昇などの効果量を表す構造体
 */
export type MiscValueType = {
    type: "misc"

    /**
     * その量が％表記されるかどうか（マグヌスTは防御力から具体的に上昇量が計算できるが、拳銃武器スキルは上昇量自体が％表記される値である）
     */
    percentExpression?: boolean
}
