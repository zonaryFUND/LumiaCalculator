import Decimal from "decimal.js";
import * as React from "react";

export type Props = {
    level1: Decimal
    perLevel?: Decimal
    level: number
    value: Decimal
}

const baseValue: React.FC<Props> = props => {
    if (props.perLevel?.greaterThan(0)) {
        return <>{props.level1.toString()}{props.perLevel ? <>+ {props.perLevel.times(props.level - 1).toString()} <span>({props.perLevel.toString()} x {props.level - 1})</span></> : null} = {props.value.toString()}</>;
    } else {
        return <>{props.value.toString()}</>;
    }
}

export default baseValue;