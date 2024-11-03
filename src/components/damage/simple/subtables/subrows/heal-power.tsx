import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    baseValue: Decimal
    healPower: Decimal
}

const healPower: React.FC<Props> = props => (
    <tr><td><FormattedMessage id="status.heal-power" /></td><td>{props.baseValue.toString()} x {props.healPower.toString()}% = {props.baseValue.percent(props.healPower).toString()}</td></tr>
)

export default healPower;