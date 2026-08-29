import Decimal from "decimal.js";
import { Status } from "core/subject-dynamic/status/type";
import { DamageTableUnit } from "./unit";

/**
 * 効果が回復効果であり、かつ発生源が「与える回復増加」ステータスを有する場合、その割合を返す
 *
 * @param status 発生源のステータス
 * @param type 効果の種類（`DamageTableUnit.type`）
 * @returns 回復量増加の割合（%）。適用対象でなければ`undefined`
 */
export function healPowerOf(status: Status, type: DamageTableUnit["type"]): Decimal | undefined {
    return type?.type == "heal" && status.healerGiveHpHealRatio.calculatedValue.greaterThan(0) ?
        status.healerGiveHpHealRatio.calculatedValue : undefined;
}

/**
 * 値に回復量増加の割合を乗算する
 *
 * @param value 回復量増加前の値
 * @param healPower `healPowerOf()`で算出した割合（未適用なら`undefined`）
 */
export function applyHealPower(value: Decimal, healPower: Decimal | undefined): Decimal {
    return value.addPercent(healPower ?? 0);
}
