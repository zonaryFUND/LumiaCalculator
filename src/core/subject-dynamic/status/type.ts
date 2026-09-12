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
    /**
     * ダメージタイプ（基本攻撃・スキル）を問わない被ダメージ増加（％）。`preventDamageRatio`（被ダメージ
     * 減少）とは逆方向の効果で、バフ・デバフ由来の効果のみで得られる独立した枠（例: 装備アビリティ
     * 「次元亀裂」の付与するデバフ「次元不安定」）。`preventDamageRatio`と同様、現時点ではインタフェース
     * （Status算出）のみで、対戦モードのダメージ計算（`core/damage-table/mitigation.ts`）への反映は
     * 未実装（対戦モードでの対応を予定）
     */
    increaseDamagedRatio: ComponentStatusValue
    attackPower: ComponentStatusValue
    increaseBasicAttackDamageRatio: ComponentStatusValue
    /**
     * 基本攻撃ダメージに対する最終補正（％）。`increaseBasicAttackDamageRatio`（基本攻撃増幅）とは
     * 別枠で乗算される効果で、実機検証の結果、基本攻撃ダメージが「攻撃力×(1+基本攻撃増幅)×(致命打倍率)
     * ×(1+この補正)」の順で計算されることを確認済み（例: 装備アビリティ「超集中」）。バフ・デバフ由来の
     * 効果のみで得られる独立した枠。`increaseSkillDamageRatio`と同様、現時点ではインタフェース（Status
     * 算出）のみで、ダメージ計算（`core/damage-table/`・`core/value-ratio/`）への反映は未実装
     */
    basicAttackDamageFinalCorrectionRatio: ComponentStatusValue
    /**
     * 基本攻撃追加ダメージ（固定値）。旧バージョンで装備固有ステータスとして存在していた
     * `increaseBasicAttackDamage`（`core/equipment/status.ts`で現在コメントアウトされている
     * 未使用フィールド）と同名・同種の効果で、`increaseBasicAttackDamageRatio`（％）とは別枠の固定値加算。
     * バフ・デバフ由来の効果のみで得られる独立した枠（例: 武器スキル「過熱」）。
     * `increaseSkillDamageRatio`と同様、現時点ではインタフェース（Status算出）のみで、ダメージ計算
     * （`core/damage-table/`・`core/value-ratio/`）への反映は未実装
     */
    increaseBasicAttackDamage: ComponentStatusValue
    /**
     * 与えるスキルダメージ増加（％、発生源基準）。`skillAmp`（スキル増幅。攻撃力/スキル増幅型のスキル威力
     * そのものを決定するステータス）とは別種の効果で、`docs/damage-model.md`「スキルダメージ増加効果」に
     * 記載の「執行人・予熱-増幅型」（発生源が実験体スキル・武器スキルであれば適用。雪Q・エイデンQのような
     * 「基本攻撃ダメージとして扱われるスキル」にも適用されるが、装備・戦術スキルのダメージには非適用）に
     * 対応する。装備アビリティ「執行人」（`brute_enforcer`）・「予熱 - 増幅」（`blaze_up_amplified`）・
     * 「光輝」（`blaze_of_glory`）が持つ。「増幅ドローン型」（ダメージ種別基準、雪Q・エイデンQには非適用だが
     * 装備・戦術スキルのダメージには適用）は判定軸が異なる別効果のため`increaseSkillTypeDamageRatio`に
     * 分離している（2026-09、検証により両者が別効果と判明したため分離。それまでは本フィールドの
     * ドキュメントに誤って増幅ドローンも含めていた）。バフ・デバフ由来の効果のみで得られる独立した枠
     * （`increaseBasicAttackDamageRatio`の基本攻撃版に対するスキル版に相当）。
     * **現時点ではインタフェース（Status算出）のみで、ダメージ計算（`core/damage-table/`・
     * `core/value-ratio/`）への反映は未実装**（`docs/known-issues.md`「『与えるスキルダメージ増加』効果を
     * 計算に反映する仕組みがない」参照）
     */
    increaseSkillDamageRatio: ComponentStatusValue
    /**
     * 与えるスキルダメージ増加（％、ダメージ種別基準）。`increaseSkillDamageRatio`（発生源基準、
     * 「執行人・予熱-増幅型」）とは判定軸が異なる別効果（`docs/damage-model.md`「スキルダメージ増加効果」の
     * 「増幅ドローン型」）で、ダメージ種別が「スキルダメージ」に分類されるものであれば発生源を問わず適用
     * される（装備・戦術スキルのスキルダメージにも適用）が、雪Q・エイデンQのような「基本攻撃ダメージとして
     * 扱われるスキル」には非適用（`increaseSkillDamageRatio`とは逆）。特性「増幅ドローン」が持つ。
     * バフ・デバフ由来の効果のみで得られる独立した枠。現時点ではインタフェース（Status算出）のみで、
     * ダメージ計算（`core/damage-table/`・`core/value-ratio/`）への反映は未実装（`docs/known-issues.md`参照）
     */
    increaseSkillTypeDamageRatio: ComponentStatusValue
    /**
     * 与えるダメージ増加（％）。`increaseBasicAttackDamageRatio`（基本攻撃のみ）・`increaseSkillDamageRatio`
     * （スキルのみ）とは異なり、基本攻撃・スキルを問わず適用される与ダメージ増加。バフ・デバフ由来の効果のみで
     * 得られる独立した枠（例: 特性「劣勢克服」）。`increaseDamagedRatio`（被ダメージ増加。逆方向）と対をなす。
     * `increaseSkillDamageRatio`と同様、現時点ではインタフェース（Status算出）のみで、ダメージ計算
     * （`core/damage-table/`・`core/value-ratio/`）への反映は未実装（`docs/known-issues.md`参照）
     */
    increaseDamageRatio: ComponentStatusValue
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