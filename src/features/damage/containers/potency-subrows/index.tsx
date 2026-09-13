import * as React from "react";
import { ExtractedMultiplier } from "core/damage-table/multiplier";
import Decimal from "decimal.js";
import StaticValueEquation from "./static-value-equation";
import MultiplyEquation from "../../components/potency-subrows/mutiply-equation";
import { DamageTableUnit } from "core/damage-table/unit";
import HealPower from "../../components/potency-subrows/heal-power";
import DamageIncrease from "../../components/potency-subrows/damage-increase";
import { ValueRatio } from "core/value-ratio";
import { FormattedMessage } from "react-intl";
import InnerTable from "components/common/inner-table";
import { DamageIncreaseEntry, damageIncreaseSteps } from "core/damage-table/damage-increase";

type Props = {
    unit: DamageTableUnit
    staticBaseValue: Decimal
    staticFinalValue?: Decimal
    dynamicBaseValue?: {[K in keyof ValueRatio]: Decimal}
    healPowerRatios?: Decimal[]
    damageIncreaseRatios?: DamageIncreaseEntry[]
    multiplier?: ExtractedMultiplier
    percent?: boolean

}

/**
 * スキル威力値をクリックしたときに表示される、詳細な威力計算式や倍率計算式などのサブセル群を生成する。
 */
const SubRowsTable: React.FC<Props> = (props) => {
    const staticSubRows: React.ReactElement[] = (() => {
        // 静的威力に対するサブセル
        if (props.staticBaseValue.isZero() || !props.staticFinalValue) return [];

        if (props.multiplier) {
            // 乗算値表示セルに対しては乗算式サブセルのみを表示する
            const baseValue = [...(props.healPowerRatios ?? []), ...(props.damageIncreaseRatios ?? []).map(entry => entry.ratio)]
                .reduce((prev, ratio) => prev.addPercent(ratio), props.staticBaseValue);
            return [<MultiplyEquation key="multiply" baseValue={baseValue} multipliers={props.multiplier.individualExpressions} finalValue={props.staticFinalValue} percent={props.percent} />];
        } else {
            // スキル威力の詳細な計算式を表記するサブセルは常に表示される
            const equation = Object.keys(props.unit.value).length == 1 && "base" in props.unit.value ? undefined :
                <StaticValueEquation
                    origin={props.unit.origin}
                    ratio={props.unit.value}
                    calculated={<>{props.staticBaseValue.floor().toString()}{props.percent}</>}
                />;

            // props.healPowerRatiosが非空の場合、この威力表記は回復値・シールド値に対するものであり、
            // さらに何らかの効果で回復・シールド量が増加しているため、その計算式サブセルが表示される
            // （複数の増加効果が同時に乗算されうるため、比率ごとに1行ずつ表示する）
            const heal = (props.healPowerRatios ?? []).map((ratio, i) =>
                <HealPower key={`healpower-${i}`} baseValue={props.staticBaseValue} healPower={ratio} />
            );

            // props.damageIncreaseRatiosが非空の場合、与ダメージ増加効果の計算式サブセルが表示される
            // （複数の発生源が同時に成立しうる。増幅ドローンと予熱-増幅の同時発動のように、それぞれ独立して
            // 乗算されるため、発生源（labelIntlID）ごとに1行ずつ表示する。2件目以降は前段の適用結果が
            // その段の適用前の値になる。`damageIncreaseSteps`参照）
            const damageIncrease = damageIncreaseSteps(props.staticBaseValue, props.damageIncreaseRatios ?? []).map(({entry, baseValue}, i) =>
                <DamageIncrease key={`damageincrease-${i}`} baseValue={baseValue} labelIntlID={entry.labelIntlID} ratio={entry.ratio} percent={props.percent} />
            );

            return [
                equation,
                ...heal,
                ...damageIncrease
            ].filter((item): item is React.ReactElement => item != undefined);
        }
    })();

    const dynamicSubRows: React.ReactElement[] = (() => {
        // 動的威力に対するサブセル
        if (props.dynamicBaseValue == undefined) return [];

        return Object.entries(props.dynamicBaseValue).flatMap(([key, value]): React.ReactElement[] => {
            if (props.multiplier) {
                // 乗算値表示セルに対しては乗算式サブセルのみを表示する
                const baseValue = [...(props.healPowerRatios ?? []), ...(props.damageIncreaseRatios ?? []).map(entry => entry.ratio)]
                    .reduce((prev, ratio) => prev.addPercent(ratio), value);
                const finalValue = baseValue.percent(props.multiplier.mergedMultiplier);

                return [
                    <MultiplyEquation 
                        key={`${key}-multiply`} 
                        baseValue={baseValue} 
                        multipliers={props.multiplier.individualExpressions} 
                        finalValue={finalValue} 
                        percent={props.percent} 
                    />
                ]
            } else {
                const targetRatio = props.unit.value[key as keyof ValueRatio];
                const hasCalculatedDynamicRatio = typeof targetRatio == "object" && !Array.isArray(targetRatio);
                const ratioCalculation = (() => {
                    if (!hasCalculatedDynamicRatio) return undefined;
                    
                    // 対象の動的レシオ自体が静的レシオから計算される（例：つばめRの対象最大体力レシオ）場合、
                    // その静的レシオの計算式を表示するサブセルを表示する
                    const intlID = (() => {
                        switch (key) {
                            case "targetHP":        return "app.label.target-hp";
                            case "targetLostHP":    return "app.label.target-lost-hp";
                            case "lostHP":          return "app.label.lost-hp";
                            case "targetMaxHP":     return "app.label.target-maxhp";
                            default:                throw new Error(`unknown dynamic ratio key: ${key}`);
                        }
                    })();

                    return (
                        <StaticValueEquation
                            key={`${key}-equation`}
                            label={<FormattedMessage id={intlID} />}
                            origin={props.unit.origin}
                            ratio={targetRatio}
                            calculated={<>{value.toString()}</>}
                            percent={true}
                        />
                    );
                })();

                // props.healPowerRatiosが非空の場合、この威力表記は回復値・シールド値に対するものであり、
                // さらに何らかの効果で回復・シールド量が増加しているため、動的威力に対する計算式サブセルが
                // 表示される（複数の増加効果が同時に乗算されうるため、比率ごとに1行ずつ表示する）
                const heal = (props.healPowerRatios ?? []).map((ratio, i) =>
                    <HealPower key={`healpower-${i}`} baseValue={value} healPower={ratio} />
                );

                const damageIncrease = damageIncreaseSteps(value, props.damageIncreaseRatios ?? []).map(({entry, baseValue}, i) =>
                    <DamageIncrease key={`${key}-damageincrease-${i}`} baseValue={baseValue} labelIntlID={entry.labelIntlID} ratio={entry.ratio} percent={true} />
                );

                return [
                    ratioCalculation,
                    ...heal,
                    ...damageIncrease
                ].filter((item): item is React.ReactElement => item != undefined);
            }
        });
    })();

    return staticSubRows.length + dynamicSubRows.length == 0 ? null : (
        <InnerTable>
            {...staticSubRows}
            {...dynamicSubRows}
        </InnerTable>
    );
}

export default SubRowsTable;