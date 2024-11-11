import Decimal from "decimal.js";
import * as React from "react";
import { MultiplierExpression } from "../../../damage-table-util";
import table from "components/common/table.module.styl";

type Props = {
    label?: React.ReactElement
    baseValue: Decimal
    multiplier: [number, MultiplierExpression[]]
    percent?: boolean
}

const multiplyEquation: React.FC<Props> = props => {
    const equation = props.multiplier[1].reduce((prev, current) => {
        if (current.label) {
            return <>{prev} x <span className={table.small}>{current.label}</span>{current.value}%</>
        } else {
            return <>{prev} x {current.value}%</>
        }
    }, <>{props.baseValue.toString()}</>);
    return <tr>
        {props.label ? <td>{props.label}</td> : null}
        <td colSpan={props.label ? undefined : 2}>{equation} = {props.baseValue.percent(props.multiplier[0]).toString()}{props.percent ? "%" : null}</td>
    </tr>
}

export default multiplyEquation;