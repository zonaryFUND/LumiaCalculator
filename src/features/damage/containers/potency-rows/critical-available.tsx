import * as React from "react";

import InnerTable from "components/common/inner-table";
import StaticValueEquation from "../potency-subrows/static-value-equation";
import MultiplyEquation from "../../components/potency-subrows/mutiply-equation";
import CriticalHit from "../../components/potency-subrows/critical-hit";
import { FormattedMessage } from "react-intl";
import { DamageTableUnit } from "core/damage-table/unit";
import Critical from "../../components/potency-rows/critical";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { calculateValue, extractSkillLevel } from "core/value-ratio";
import { criticalMultiplier, expectedMultiplier } from "core/damage-table/critical";
import { extractMultiplier } from "core/damage-table/multiplier";

/**
 * 致命打の可能性があるダメージ（致命打無効になっていない基本攻撃ダメージ属性）について、
 * 基礎値・致命打・期待値の3値をそれぞれセルで表示する効果量表示行、
 * および計算式サブセルを構成する
 * 
 * 通常の基本攻撃や、カミロQWなどの威力表示に用いる
 */
const criticalAvailable: React.FC<DamageTableUnit> = props => {
    const config = useSubjectStateStore(state => state.config);
    const status = useSubjectStateStore(state => state.status);

    // 通常ヒットダメージ
    const regularDamage = calculateValue(props.value, status, config, props.origin).static;
    
    const criticalChance = status.criticalStrikeChance.calculatedValue;
    const damageMultiplier = criticalMultiplier(status.criticalStrikeDamage.calculatedValue);
    // 致命打の計算式行（<CriticalHit>）が表示する「175% + 追加分」の内訳のうち、追加分のみの割合
    const criticalDamageRatio = damageMultiplier.sub(100);

    // クリティカルヒットダメージ
    const criticalDamage = regularDamage.percent(damageMultiplier);

    // ダメージ期待値
    const expectedValue = regularDamage.percent(expectedMultiplier(criticalChance, damageMultiplier));

    const skillLevel = extractSkillLevel(config, props.origin);
    const multiplier = extractMultiplier(props.multiplier, skillLevel);

    if (!multiplier) {
        // 通常の基本攻撃効果量
        return (
            <Critical
                labelIntlID={props.label}
                regularDamage={regularDamage}
                criticalDamage={criticalChance.greaterThan(0) ? criticalDamage : undefined}
                expectedValue={expectedValue}
                subtable={
                    <InnerTable>
                        <StaticValueEquation
                            label={<FormattedMessage id="app.standard-value" />}
                            origin={props.origin}
                            ratio={props.value}
                            calculated={<>{regularDamage.floor().toString()}</>}
                        />
                        <CriticalHit
                            regularDamage={regularDamage}
                            criticalDamage={criticalDamage.floor()}
                            criticalDamageAdditionalRatio={criticalDamageRatio}
                        />
                    </InnerTable>
                }
            />
        )
    } else {
        // 複数段ヒットなどの倍率指定がされている効果量
        const regularMultipliedDamage = regularDamage.percent(multiplier.mergedMultiplier).floor();
        const criticalMultipliedDamage = criticalDamage.percent(multiplier.mergedMultiplier).floor();

        return (
            <Critical
                labelIntlID={props.label}
                regularDamage={regularDamage}
                criticalDamage={criticalChance.greaterThan(0) ? criticalDamage : undefined}
                expectedValue={expectedValue}
                subtable={
                    <InnerTable>
                        <MultiplyEquation 
                            label={<FormattedMessage id="app.standard-value" />}
                            baseValue={regularDamage}
                            multipliers={multiplier.individualExpressions}
                            finalValue={regularMultipliedDamage}
                        />
                        <MultiplyEquation 
                            label={<FormattedMessage id="app.critical-hit" />}
                            baseValue={criticalDamage}
                            multipliers={multiplier.individualExpressions}
                            finalValue={criticalMultipliedDamage}
                        />
                    </InnerTable>
                }
            />
        )
    }
}

export default criticalAvailable;