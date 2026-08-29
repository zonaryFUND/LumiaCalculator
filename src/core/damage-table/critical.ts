import Decimal from "decimal.js";
import { BaseCriticalDamagePercent } from "core/subject-dynamic/status/standard-values";

/**
 * 致命打発生時のダメージ倍率（%）
 *
 * 基礎値75% + 100% + 実験体の致命打ダメージ量ステータス
 * （`docs/damage-model.md`「致命打（クリティカル）」参照）
 *
 * @param criticalStrikeDamage 実験体の致命打ダメージ量ステータス（`status.criticalStrikeDamage.calculatedValue`）
 */
export function criticalMultiplier(criticalStrikeDamage: Decimal): Decimal {
    return BaseCriticalDamagePercent.add(100).add(criticalStrikeDamage);
}

/**
 * 致命打確率を踏まえた期待値倍率（%）
 *
 * (100% - 致命打確率) + 致命打倍率 x 致命打確率
 *
 * @param criticalChance 致命打確率（`status.criticalStrikeChance.calculatedValue`）
 * @param criticalMultiplier `criticalMultiplier()`で算出した致命打倍率
 */
export function expectedMultiplier(criticalChance: Decimal, criticalMultiplier: Decimal): Decimal {
    return new Decimal(100).sub(criticalChance).add(criticalMultiplier.percent(criticalChance));
}
