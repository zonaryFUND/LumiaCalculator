import Decimal from "decimal.js";
import * as React from "react";

type Props = {
    ratio: Decimal
    label: React.ReactNode
}

const ratio: React.FC<Props> = props => (
    <tr><td>{props.label}</td><td>{props.ratio.toString()}%</td></tr>
)

export default ratio;

