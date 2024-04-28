import Decimal from "decimal.js";
import * as React from "react";

type Props = {
    perMastery: Decimal.Value
    name: string
    mastery: number
    percent?: boolean
    digit?: number
}

const mastery: React.FC<Props> = props => (
    <><span>{props.perMastery.toString()}{props.percent ? "％" : null} x {props.name}{props.mastery}</span> = {new Decimal(props.perMastery).times(props.mastery).cut(props.digit ?? 2, "floor").toString()}{props.percent ? "％" : null}</>
)

export default mastery;