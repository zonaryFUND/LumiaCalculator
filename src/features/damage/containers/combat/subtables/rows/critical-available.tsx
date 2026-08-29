import * as React from "react";
import { Status } from "core/subject-dynamic/status/type";
import StandardDamage from "./standard-damage";
import { DamageTableUnit } from "core/damage-table/unit";
import { SubjectConfig } from "core/subject-dynamic/config";
import { criticalMultiplier, expectedMultiplier } from "core/damage-table/critical";

type Props = DamageTableUnit & {
    config: SubjectConfig
    status: Status
}

const criticalAvailable: React.FC<Props> = props => {
    const criticalChance = props.status.criticalStrikeChance.calculatedValue;
    const showCritical = criticalChance.greaterThan(0);
    const showExpected = showCritical && criticalChance.lessThan(100);

    const criticalDamage = criticalMultiplier(props.status.criticalStrikeDamage.calculatedValue);
    const expected = expectedMultiplier(criticalChance, criticalDamage);

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