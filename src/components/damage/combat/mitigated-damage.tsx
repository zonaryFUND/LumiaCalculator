import Decimal from "decimal.js";
import * as React from "react";
import { Mitigation } from "./mitigation-context";

function mitigatedDamage(potency: Decimal, mitigation: Mitigation, type: "basic" | "skill", summoned: boolean): [Decimal, React.ReactElement[]] {
    const defenseMitigation = summoned ? mitigation.defenseMitigation.summoned! : mitigation.defenseMitigation.basic;
    const defenseDescription = <tr><td>防御力による軽減</td><td>{defenseMitigation.times(100).floor().toString()}%</td></tr>

    const additionalMitigation = type == "basic" ? mitigation.basicAttackMitigation : mitigation.skillMitigation;
    const [additionalRatio, descriptions] = additionalMitigation.reduce((prev, current) => {
        return [
            prev[0].add(current.value),
            prev[1].concat(
                <tr><td>{current.label}</td><td>{current.value.toString()}%</td></tr>
            )
        ]
    }, [new Decimal(0), [defenseDescription]])

    return [potency.subPercent(defenseMitigation).subPercent(additionalRatio), descriptions];
};

export default mitigatedDamage;