import Decimal from "decimal.js";
import { Status } from "core/subject-dynamic/status/type";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";
import { DamageTableUnit } from "./unit";
import { ValueOrigin } from "core/value-ratio";

const skillOrigins: ValueOrigin[] = ["Q", "W", "E", "R", "T", "D"];

/**
 * 与ダメージ増加効果1件分（1つの発生源による1つの割合）
 */
export type DamageIncreaseEntry = {
    /**
     * 発生源を表示するための翻訳テキストID（バフ・デバフ定義の`intlID`をそのまま使う）
     */
    labelIntlID?: string

    /**
     * 増加割合（％）
     */
    ratio: Decimal
}

/**
 * `increaseSkillDamageRatio`等の与ダメージ増加系フィールドは、複数の発生源（例: 執行人と予熱-増幅が同時発動）
 * が同時に同じフィールドへ書き込みうる。実機検証の結果、これらは合算してから1回だけ乗算されるのではなく、
 * 発生源ごとに独立して乗算されることを確認済みのため、`calculatedValue`（合算済みの最終値）ではなく、
 * 集計前の`components`から発生源ごとに1件ずつ取り出す
 */
function entriesOf(components: StatusValueComponent[]): DamageIncreaseEntry[] {
    return components
        .map((component): DamageIncreaseEntry => ({ labelIntlID: component.intlID, ratio: new Decimal(component.value.value ?? 0) }))
        .filter(entry => entry.ratio.greaterThan(0));
}

/**
 * 効果が与ダメージ増加・減少効果の対象となるダメージ種別（基本攻撃・スキルダメージ）であり、かつ発生源が
 * それらを増加させるステータスを有する場合、乗算すべき割合（発生源ごとに独立した`DamageIncreaseEntry`）を
 * 配列として返す
 *
 * 実機検証の結果、固定ダメージ（`type.type == "true"`）はいかなる与ダメージ増加・減少効果も受け付けない
 * ことを確認済みのため対象外とする（回復・シールド・その他効果量も対象外。回復・シールドの増減効果は
 * `heal-power.ts`の`healPowerRatiosOf`が別途担う）
 *
 * - `increaseSkillDamageRatio`（発生源基準、執行人型）: `origin`が実験体スキル・武器スキル
 *   （Q/W/E/R/T/D）であれば、`type`が`basic`であっても（雪Q・エイデンQ等）適用する
 * - `increaseSkillTypeDamageRatio`（ダメージ種別基準、増幅ドローン型）: `type`が`skill`
 *   （未指定時のデフォルトも含む）であれば発生源を問わず適用する。`basic`には非適用
 * - `basicAttackDamageFinalCorrectionRatio`（超集中型）: `type`が`basic`のときのみ適用する
 * - `increaseDamageRatio`（劣勢克服型）: `basic`・`skill`のいずれでも発生源を問わず適用する
 *
 * @param status 発生源のステータス
 * @param origin 効果の発生源（`DamageTableUnit.origin`）
 * @param type 効果の種類（`DamageTableUnit.type`）
 */
export function damageIncreaseRatiosOf(status: Status, origin: ValueOrigin | undefined, type: DamageTableUnit["type"]): DamageIncreaseEntry[] {
    if (type != undefined && type.type != "basic" && type.type != "skill") return [];

    const isSkillType = type == undefined || type.type == "skill";
    const isBasicType = type?.type == "basic";
    const isSkillOrigin = origin != undefined && skillOrigins.includes(origin);

    return [
        ...(isSkillOrigin ? entriesOf(status.increaseSkillDamageRatio.components) : []),
        ...(isSkillType ? entriesOf(status.increaseSkillTypeDamageRatio.components) : []),
        ...(isBasicType ? entriesOf(status.basicAttackDamageFinalCorrectionRatio.components) : []),
        ...entriesOf(status.increaseDamageRatio.components)
    ];
}

/**
 * 値に与ダメージ増加割合を、発生源ごとに独立して順に乗算する
 *
 * @param value 増加前の値
 * @param entries `damageIncreaseRatiosOf()`で算出した割合の配列
 */
export function applyDamageIncrease(value: Decimal, entries: DamageIncreaseEntry[]): Decimal {
    return entries.reduce((prev, entry) => prev.addPercent(entry.ratio), value);
}

/**
 * 与ダメージ増加効果1件分の計算式表示に必要な情報（その段の適用前の値）
 */
export type DamageIncreaseStep = {
    entry: DamageIncreaseEntry

    /**
     * この`entry`を適用する直前の値（先行するentryの適用結果を含む）
     */
    baseValue: Decimal
}

/**
 * `entries`を順に適用したときの各段の「適用前の値」を、表示用に段ごとに求める
 *
 * `applyDamageIncrease`は最終値のみを返すが、計算式サブセル（`DamageIncrease`行）は各`entry`について
 * 「その段の適用前の値 x 割合% = その段の適用後の値」を表示する必要があるため、`entries`が2件以上ある場合、
 * 2件目以降の適用前の値は元の`baseValue`ではなく1件目の適用結果になる（例: 威力100に増幅ドローン15%・
 * 予熱-増幅15%が同時に乗る場合、1件目は「100 x 15% = 115」、2件目は「115 x 15% = 132」であり、
 * 2件目も「100 x 15%」と表示するのは誤り）
 *
 * @param baseValue entries適用前の元の値
 * @param entries `damageIncreaseRatiosOf()`で算出した割合の配列
 */
export function damageIncreaseSteps(baseValue: Decimal, entries: DamageIncreaseEntry[]): DamageIncreaseStep[] {
    return entries.reduce((prev, entry) => ({
        value: prev.value.addPercent(entry.ratio),
        steps: [...prev.steps, { entry, baseValue: prev.value }]
    }), { value: baseValue, steps: [] as DamageIncreaseStep[] }).steps;
}
