import Decimal from "decimal.js";
import * as React from "react";
import { extractMultiplier } from "../../damage-table-util";

type Props = {
    baseValue: Decimal
    level: number
    multipliers: number | number[] | {name: string, value: number}[]
}

const multipliedValue: React.FC<Props> = props => {
    const multipliers = React.useMemo(() => extractMultiplier(props.level, props.multipliers)!, [props.level, props.multipliers]);
    const equation = multipliers[1].reduce((prev, current) => {
        if (current.label) {
            return <>{prev} x <span>{current.label}</span>{current.value}%</>
        } else {
            return <>{prev} x {current.value}%</>
        }
    }, <>{props.baseValue.toString()}</>);
    return <td>{equation} = {props.baseValue.percent(multipliers[0]).toString()}</td>
}

export default multipliedValue;