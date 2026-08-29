import * as React from "react";
import { ExtractedMultiplier } from "../../damage-table-util";
import Decimal from "decimal.js";
import StaticValueEquation from "./static-value-equation";
import MultiplyEquation from "../../components/potency-subrows/mutiply-equation";
import { DamageTableUnit } from "core/damage-table/unit";
import HealPower from "../../components/potency-subrows/heal-power";
import { ValueRatio } from "core/value-ratio";
import { FormattedMessage } from "react-intl";
import InnerTable from "components/common/inner-table";

type Props = {
    unit: DamageTableUnit
    staticBaseValue: Decimal
    staticFinalValue?: Decimal
    dynamicBaseValue?: {[K in keyof ValueRatio]: Decimal}
    healMultiplier?: Decimal
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
            const baseValue = props.staticBaseValue.percent(props.healMultiplier || 100);
            return [<MultiplyEquation key="multiply" baseValue={baseValue} multipliers={props.multiplier.individualExpressions} finalValue={props.staticFinalValue} percent={props.percent} />];
        } else {
            // スキル威力の詳細な計算式を表記するサブセルは常に表示される
            const equation = Object.keys(props.unit.value).length == 1 && "base" in props.unit.value ? undefined :
                <StaticValueEquation
                    origin={props.unit.origin}
                    ratio={props.unit.value}
                    calculated={<>{props.staticBaseValue.floor().toString()}{props.percent}</>}
                />;

            // props.healMultiplierが非undefinedの場合、この威力表記は回復値に対するものであり、
            // さらに何らかの効果で回復力が増加しているため、その計算式サブセルが表示される
            const heal = !props.healMultiplier ? undefined : 
                <HealPower key="healpower" baseValue={props.staticBaseValue} healPower={props.healMultiplier} />;

            return [
                equation,
                heal
            ].filter((item): item is React.ReactElement => item != undefined);
        }
    })();

    const dynamicSubRows: React.ReactElement[] = (() => {
        // 動的威力に対するサブセル
        if (props.dynamicBaseValue == undefined) return [];

        return Object.entries(props.dynamicBaseValue).flatMap(([key, value]): React.ReactElement[] => {
            if (props.multiplier) {
                // 乗算値表示セルに対しては乗算式サブセルのみを表示する 
                const baseValue = value.percent(props.healMultiplier || 100);
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

                // props.healMultiplierが非undefinedの場合、この威力表記は回復値に対するものであり、
                // さらに何らかの効果で回復力が増加しているため、動的威力に対する計算式サブセルが表示される
                const heal = !props.healMultiplier ? undefined : 
                    <HealPower key="healpower" baseValue={value} healPower={props.healMultiplier} />;

                return [
                    ratioCalculation,
                    heal
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