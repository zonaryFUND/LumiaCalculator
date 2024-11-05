import Decimal from "decimal.js";
import * as React from "react";
import { Mitigation } from "./mitigation-context";

export type MitigationInfo = {
    labelIntlID: string
    value: Decimal
    base: Decimal
    mitigated: Decimal
}

function mitigatedDamage(potency: Decimal, mitigation: Mitigation, type: "basic" | "skill", fromSummoned: boolean): [Decimal, MitigationInfo[]] {
    const defenseMitigation = fromSummoned ? mitigation.defenseMitigation.summoned! : mitigation.defenseMitigation.basic;
    const defenseInfo = {
        labelIntlID: "app.mitigation.defense",
        value: defenseMitigation.floor(),
        base: potency,
        mitigated: potency.percent(defenseMitigation).floor()
    }

    const base = potency.subPercent(defenseMitigation).floor();

    const additionalMitigation = type == "basic" ? mitigation.basicAttackMitigation : mitigation.skillMitigation;
    const [additionalRatio, info] = additionalMitigation.reduce((prev, current) => {
        return [
            prev[0].add(current.value),
            prev[1].concat({
                ...current,
                base,
                mitigated: base.percent(current.value).floor()
            })
        ]
    }, [new Decimal(0), [defenseInfo]])

    return [base.subPercent(additionalRatio), info];
};

export default mitigatedDamage;