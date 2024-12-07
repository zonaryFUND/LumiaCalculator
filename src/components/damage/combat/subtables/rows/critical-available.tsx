import * as React from "react";
import { Status } from "app-types/subject-dynamic/status/type";
import StandardDamage from "./standard-damage";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";
import Decimal from "decimal.js";

type Props = DamageTableUnit & {
    skillLevel?: number
    config: SubjectConfig
    status: Status
}

const criticalAvailable: React.FC<Props> = props => {
    const criticalChance = props.status.criticalStrikeChance.calculatedValue;
    const showCritical = criticalChance.greaterThan(0);
    const showExpected = showCritical && criticalChance.lessThan(100);

    const criticalDamage = BaseCriticalDamagePercent.add(100).add(props.status.criticalStrikeDamage.calculatedValue);
    const expected = new Decimal(100).sub(criticalChance).add(criticalDamage.percent(criticalChance));

    const modifiedMultiplier = (added: number) => {
        if (props.multiplier == undefined) return added;
        if (typeof props.multiplier == "number") return [props.multiplier, added];
        if (typeof props.multiplier[0] == "number") return props.multiplier.concat(added);
        return props.multiplier.concat({value: added});
    };

    return (
        <>
            <StandardDamage 
                {...props}
                label={`${props.label}(基礎値)`}
            />
            {
                showCritical ?
                <StandardDamage 
                    {...props}
                    label={`${props.label}${showExpected ? "(致命打)" : "(確定致命打)"}`}
                    multiplier={modifiedMultiplier(criticalDamage.toNumber()) as any}
                />
                : null
            }
            {
                showExpected ?
                <StandardDamage 
                    {...props}
                    label={`${props.label}(期待値)`}
                    multiplier={modifiedMultiplier(expected.toNumber()) as any}
                />
                : null
            }
        </>
    )
}

export default criticalAvailable;