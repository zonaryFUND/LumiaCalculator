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
    /**
     * ダメージタイプ（基本攻撃・スキル）を問わない被ダメージ減少（％）。防御熟練度由来の
     * `preventBasicAttackDamagedRatio`/`preventSkillDamagedRatio`とは異なり、バフ・デバフ
     * （`origin: "temporary-status"`）由来の効果のみで得られる独立した枠（例: アロンソW）。
     * 現時点ではインタフェース（Status算出）のみで、対戦モードのダメージ軽減計算（`core/damage-table/
     * mitigation.ts`）への反映は未実装
     */
    preventDamageRatio: ComponentStatusValue
    attackPower: ComponentStatusValue
    increaseBasicAttackDamageRatio: ComponentStatusValue
    /**
     * 与えるスキルダメージ増加（％）。`skillAmp`（スキル増幅。攻撃力/スキル増幅型のスキル威力そのものを
     * 決定するステータス）とは別種の効果で、`docs/damage-model.md`「スキルダメージ増加効果」に記載の
     * 特性「増幅ドローン」・装備アビリティ「執行人」（`brute_enforcer`）・「予熱 - 増幅」
     * （`blaze_up_amplified`）・「光輝」（`blaze_of_glory`）が持つ。バフ・デバフ由来の効果のみで得られる
     * 独立した枠（`increaseBasicAttackDamageRatio`の基本攻撃版に対するスキル版に相当）。
     * **現時点ではインタフェース（Status算出）のみで、ダメージ計算（`core/damage-table/`・
     * `core/value-ratio/`）への反映は未実装**（`docs/known-issues.md`「『与えるスキルダメージ増加』効果を
     * 計算に反映する仕組みがない」参照。増幅ドローン型/執行人型の適用対象の違いの設計が必要）
     */
    increaseSkillDamageRatio: ComponentStatusValue
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
    /**
     * 自身が受ける治癒効果減少（％）。`healerGiveHpHealRatio`（自身が与える回復量の増加）とは逆に、
     * 自身に対して行われる回復量を減少させる。バフ・デバフ由来の効果のみで得られる独立した枠
     * （例: キャシーTの致命的外傷、ゲーム内表記`StatType/HpHealedDecreaseRatio`「治癒効果減少」）
     */
    hpHealedDecreaseRatio: ComponentStatusValue
    /**
     * 自身が受ける回復量増加（％）。`hpHealedDecreaseRatio`（受ける治癒効果減少）とは逆方向の効果で、
     * バフ・デバフ由来の効果のみで得られる独立した枠（例: 装備アビリティ「セカンドウインド - 血の契約」、
     * ゲーム内表記`StatType/HpHealedIncreaseRatio`「受ける回復増加」）。`hpHealedDecreaseRatio`との
     * 併存時の関係（乗算か、どちらか一方が優先されるか等）は未検証。`preventDamageRatio`と同様、
     * 現時点ではインタフェース（Status算出）のみで、対戦モードの回復量計算（`core/damage-table/
     * heal-power.ts`）への反映は未実装
     */
    hpHealedIncreaseRatio: ComponentStatusValue
    /**
     * 自身が与える回復・シールド効果増加（％）。`healerGiveHpHealRatio`（回復のみ対象）と異なり、シールド
     * 効果にも適用される。バフ・デバフ由来の効果のみで得られる独立した枠（例: シャーロットT、特性「超再生」）。
     * `healerGiveHpHealRatio`とこのフィールドは、実機検証の結果それぞれ独立に乗算されることを確認済み
     * （合算してから1回だけ乗算するのではない。`core/damage-table/heal-power.ts`の`healPowerRatiosOf`参照）
     */
    healerGiveHealShieldRatio: ComponentStatusValue
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