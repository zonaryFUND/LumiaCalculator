import Decimal from "decimal.js";
import * as React from "react";

type Props = {
    proportionality: Decimal
    level: number
    percent?: boolean
}

const multipliedValue: React.FC<Props> = props => (
    <>{props.proportionality.times(props.level).toString()}{props.percent ? "％" : null} <span>({props.proportionality.toString()}{props.percent ? "％" : null} x {props.level})</span></>
);

export default multipliedValue;