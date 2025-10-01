import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";
import { Status } from "app-types/subject-dynamic/status/type";
import { calculateValue, extractSkillLevel } from "app-types/value-ratio";
import Decimal from "decimal.js";
import { ExtractedMultiplier, extractMultiplier } from "./damage-table-util";

type Props = DamageTableUnit & {
    config: SubjectConfig
    status: Status
}

type Response = {
    /**
     * 非致命打威力
     */
    regularDamage: {
        /**
         * 倍率指定がある場合、倍率乗算前の威力
         */
        base?: Decimal

        /**
         * 計算結果
         */
        final: Decimal
    }

    /**
     * 致命打威力
     */
    criticalDamage: {
        /**
         * 倍率指定がある場合、倍率乗算前の威力
         */
        base?: Decimal

        /**
         * 計算結果
         */
        final: Decimal
    }

    /**
     * 致命打率を踏まえた威力期待値
     */
    expectedValue: Decimal

    /**
     * 倍率指定がある場合、抽出された倍率情報
     */
    multiplier?: ExtractedMultiplier
}

/**
 * 基本攻撃またはその属性を持つダメージについて、基礎威力や致命打威力、期待値などをまとめた構造体を計算して出力する
 */
export function calculateBasicAttackTypeDamage(props: Props): Response {
    const skillLevel = extractSkillLevel(props.config, props.origin);
    
    const regularDamage = calculateValue(props.value, props.status, props.config, props.origin).static;

    const criticalChance = props.status.criticalStrikeChance.calculatedValue
    const criticalDamagePlus = props.status.criticalStrikeDamage.calculatedValue;
    const criticalDamage = regularDamage.addPercent(BaseCriticalDamagePercent.add(criticalDamagePlus));
    const expectedValue = regularDamage.percent(new Decimal(100).sub(criticalChance))
        .add(criticalDamage.percent(criticalChance));

    const multiplier = extractMultiplier(props.multiplier, skillLevel);
    const regularMultipliedDamage = regularDamage.percent(multiplier?.mergedMultiplier ?? 100).floor();
    const criticalMultipliedDamage = criticalDamage.percent(multiplier?.mergedMultiplier ?? 100).floor();

    return {
        regularDamage: {
            base: multiplier != undefined ? regularDamage : undefined,
            final: regularMultipliedDamage
        },
        criticalDamage: {
            base: multiplier != undefined ? criticalDamage : undefined,
            final: criticalMultipliedDamage
        },
        expectedValue,
        multiplier
    }
}