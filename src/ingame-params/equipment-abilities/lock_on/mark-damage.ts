import Constants from "./constants.json";
import { Status } from "core/subject-dynamic/status/type";
import Decimal from "decimal.js";

// マーク消費時の追加ダメージ。「(+致命打確率の50%)」は、既存のcriticalChanceレシオ（それまでの合計に
// 致命打確率×比率ぶんの割合を上乗せする乗算項。docs/damage-model.md「例5」）とは異なり、
// 致命打確率（%の数値）×比率をそのまま加算する項であるため、ValueRatioでは表現できない
export function markDamageOf(status: Status): Decimal {
    return new Decimal(Constants.mark_damage.base)
        .add(status.attackPower.calculatedValue.percent(Constants.mark_damage.attack))
        .add(status.criticalStrikeChance.calculatedValue.percent(Constants.mark_damage.criticalChance));
}
