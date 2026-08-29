import * as React from "react";
import { Status } from "core/subject-dynamic/status/type";
import StandardDamage from "./standard-damage";
import { DamageTableUnit } from "core/damage-table/unit";
import { SubjectConfig } from "core/subject-dynamic/config";
import { BaseCriticalDamagePercent } from "core/subject-dynamic/status/standard-values";
import Decimal from "decimal.js";

type Props = DamageTableUnit & {
    config: SubjectConfig
    status: Status
}

const criticalAvailable: React.FC<Props> = props => {
    const criticalChance = props.status.criticalStrikeChance.calculatedValue;
    const showCritical = criticalChance.greaterThan(0);
    const showExpected = showCritical && criticalChance.lessThan(100);

    const criticalDamage = BaseCriticalDamagePercent.add(100).add(props.status.criticalStrikeDamage.calculatedValue);
    const expected = new Decimal(100).sub(criticalChance).add(criticalDamage.percent(criticalChance));

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
                    critical={criticalDamage}
                />
                : null
            }
            {
                showExpected ?
                <StandardDamage 
                    {...props}
                    label={`${props.label}(期待値)`}
                    critical={expected}
                />
                : null
            }
        </>
    )
}

export default criticalAvailable;