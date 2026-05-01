import * as React from "react";
import style from "../../components/potency-rows/damage-table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { extractSkillLevel, ValueOrigin, ValueRatio } from "app-types/value-ratio";
import { Status } from "app-types/subject-dynamic/status/type";
import { calculateValue } from "app-types/value-ratio";
import { extractMultiplier } from "../../../../components/damage/damage-table-util";
import { DamageTableUnit } from "app-types/damage-table/unit";
import Standard from "../../components/potency-rows/standard";
import DynamicRatioExpression from "./dynamic-ratio-expression";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import Decimal from "decimal.js";
import SubRowsTable from "../potency-subrows";

type Props = Omit<DamageTableUnit, "value"> & {
    origin?: ValueOrigin
    value: ValueRatio
    config: SubjectConfig
    status: Status
    hp: number
}

const standardDamage: React.FC<Props> = props => {
    const {static: staticBaseValue, dynamic: dynamicBaseValue} = calculateValue(props.value, props.status, props.config, props.origin);
    const healPower0 = useSubjectStateStore(state => state.status.healerGiveHpHealRatio.calculatedValue);

    const skillLevel = extractSkillLevel(props.config, props.origin)
    const multiplier = extractMultiplier(props.multiplier, skillLevel);    
    const healPower = (props.type?.type == "heal") && props.status.healerGiveHpHealRatio.calculatedValue.greaterThan(0) ?
        props.status.healerGiveHpHealRatio.calculatedValue : undefined;
    const percent = React.useMemo(() => props.type && ("percentExpression" in props.type) && props.type.percentExpression, [props.type]);


    const multipliers = [
        props.type?.type == "heal" ? healPower0.add(100) : undefined,
        multiplier?.mergedMultiplier
    ].filter((item): item is Decimal => item != undefined);

    const staticFinalValue = (() => {
        if (staticBaseValue.isZero()) return undefined;
        return multipliers.reduce((prev, current) => prev.percent(current), staticBaseValue);
    })();


    const valueClass = (() => {
        return props.type ? style[props.type.type] : style.skill;
    })();

    return (
        <Standard 
            label={props.label}
            value={
                <>
                    {staticFinalValue?.floor().toString()}
                    {dynamicBaseValue ? 
                        <DynamicRatioExpression 
                            beginAsSecondUnit={!staticBaseValue.isZero()} 
                            dynamicRatio={dynamicBaseValue} 
                            multipliers={multipliers} 
                        /> : null}
                    {percent ? "%" : null}
                </>
            }
            valueClass={valueClass}
            subtable={
                <SubRowsTable 
                    unit={props}
                    staticBaseValue={staticBaseValue}
                    staticFinalValue={staticFinalValue}
                    dynamicBaseValue={dynamicBaseValue}
                    healMultiplier={healPower}
                    multiplier={multiplier}
                    percent={percent}
                />
            }
        />
    )
}

export default standardDamage;