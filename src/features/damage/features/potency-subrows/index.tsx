import * as React from "react";
import { ExtractedMultiplier } from "components/damage/damage-table-util";
import Decimal from "decimal.js";
import StaticValueEquation from "./static-value-equation";
import MultiplyEquation from "../../components/potency-subrows/mutiply-equation";
import { DamageTableUnit } from "app-types/damage-table/unit";
import HealPower from "../../components/potency-subrows/heal-power";
import { ValueRatio } from "app-types/value-ratio";
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

const SubRowsTable: React.FC<Props> = (props) => {
    const staticSubRows: React.ReactElement[] = (() => {
        if (props.staticBaseValue.isZero() || !props.staticFinalValue) return [];

        if (props.multiplier) {
            const baseValue = props.staticBaseValue.percent(props.healMultiplier || 100);
            return [<MultiplyEquation key="multiply" baseValue={baseValue} multipliers={props.multiplier.individualExpressions} finalValue={props.staticFinalValue} percent={props.percent} />];
        } else {
            const equation = Object.keys(props.unit.value).length == 1 && "base" in props.unit.value ? undefined :
                <StaticValueEquation
                    origin={props.unit.origin}
                    ratio={props.unit.value}
                    calculated={<>{props.staticBaseValue.floor().toString()}{props.percent}</>}
                />;
            const heal = !props.healMultiplier ? undefined : 
                <HealPower key="healpower" baseValue={props.staticBaseValue} healPower={props.healMultiplier} />;

            return [
                equation,
                heal
            ].filter((item): item is React.ReactElement => item != undefined);
        }
    })();

    const dynamicSubRows: React.ReactElement[] = (() => {
        if (props.dynamicBaseValue == undefined) return [];

        return Object.entries(props.dynamicBaseValue).flatMap(([key, value]): React.ReactElement[] => {
            if (props.multiplier) {
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
                // 対象の動的レシオ自体が静的レシオから計算される（例：つばめRの対象最大体力レシオ）場合、
                // その静的レシオの計算式を表示する
                const targetRatio = props.unit.value[key as keyof ValueRatio];
                const hasCalculatedDynamicRatio = typeof targetRatio == "object" && !Array.isArray(targetRatio);
                const ratioCalculation = (() => {
                    if (!hasCalculatedDynamicRatio) return undefined;
                    
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