import Decimal from "decimal.js";
import { Status } from "core/subject-dynamic/status/type";
import { DamageTableUnit } from "./unit";

/**
 * 効果が回復効果・シールド効果であり、かつ発生源（与え手・受け手）がそれらを増加させるステータスを有する
 * 場合、乗算すべき割合（％）を配列として返す
 *
 * 「与える回復増加」（`healerGiveHpHealRatio`、回復のみ対象）と「与える回復・シールド効果増加」
 * （`healerGiveHealShieldRatio`、回復・シールド両方対象）は、実機検証の結果、それぞれ独立に乗算される
 * ことを確認済み（合算してから1回だけ乗算するのではない）。そのため単一の割合ではなく配列で返し、
 * `applyHealPower`側で順に`.addPercent()`する
 *
 * `hpHealedIncreaseRatio`（自身が受ける回復量増加）・`hpHealedDecreaseRatio`（自身が受ける治癒効果減少）は
 * 「受け手」側の効果であり、シンプルモードには対象（相手）実験体の概念がないため、`type.target == "self"`
 * （アイザックTのような自己回復）の場合のみ、発生源＝受け手が同一実験体であることが確定するため適用する
 * （`target == "any" | "ally"`は受け手が発生源自身とは限らないため対象外）
 *
 * @param status 発生源のステータス
 * @param type 効果の種類（`DamageTableUnit.type`）
 * @returns 適用すべき割合（％）の配列。適用対象がなければ空配列
 */
export function healPowerRatiosOf(status: Status, type: DamageTableUnit["type"]): Decimal[] {
    if (type?.type != "heal" && type?.type != "shield") return [];

    const isSelfTargetHeal = type.type == "heal" && type.target == "self";

    return [
        type.type == "heal" ? status.healerGiveHpHealRatio.calculatedValue : undefined,
        status.healerGiveHealShieldRatio.calculatedValue,
        isSelfTargetHeal ? status.hpHealedIncreaseRatio.calculatedValue : undefined,
        isSelfTargetHeal ? status.hpHealedDecreaseRatio.calculatedValue.negated() : undefined
    ].filter((v): v is Decimal => v != undefined && !v.isZero());
}

/**
 * 値に回復量増加の割合を順に乗算する
 *
 * @param value 回復量増加前の値
 * @param healPowerRatios `healPowerRatiosOf()`で算出した割合の配列
 */
export function applyHealPower(value: Decimal, healPowerRatios: Decimal[]): Decimal {
    return healPowerRatios.reduce((prev, ratio) => prev.addPercent(ratio), value);
}
