import Decimal from "decimal.js";
import * as React from "react";
import { Mitigation } from "./mitigation-context";

export type MitigationInfo = {
    labelIntlID: string
    value: Decimal
    base: Decimal
    mitigated: Decimal
    subtractionCount?: number
}

function mitigatedDamage(potency: Decimal, mitigation: Mitigation, type: "basic" | "skill", fromSummoned: boolean, hitCount?: number): [Decimal, MitigationInfo[]] {
    const defenseMitigation = fromSummoned ? mitigation.defenseMitigation.summoned! : mitigation.defenseMitigation.basic;
    const defenseInfo: MitigationInfo = {
        labelIntlID: "app.mitigation.defense",
        value: defenseMitigation.floor(),
        base: potency,
        mitigated: potency.percent(defenseMitigation).floor()
    }

    const base = potency.subPercent(defenseMitigation).floor();

    const additionalMitigation = type == "basic" ? mitigation.basicAttackMitigation : mitigation.skillMitigation;
    const [additionalRatio, info] = additionalMitigation.reduce((prev, current) => {
        const subtraction = ("mitigationType" in current && current.mitigationType == "constant");
        return [
            prev[0].add(current.value),
            prev[1].concat({
                ...current,
                base,
                mitigated: 
                    subtraction ?
                    base.sub(current.value.mul(hitCount || 1)) :
                    base.percent(current.value).floor(),
                subtractionCount: subtraction ? (hitCount || 1) : undefined
            })
        ]
    }, [new Decimal(0), [defenseInfo]])

    return [base.subPercent(additionalRatio), info];
};

export default mitigatedDamage;