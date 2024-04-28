import Decimal from "decimal.js";
import * as React from "react";
import InnerTable from "./inner-table";
import Mastery from "./mastery";
import { MovementSpeedPerMastery } from "../standard-values";

type Props = {
    base: Decimal
    additional: Decimal
    movementMastery: number
}

const movementSpeed: React.FC<Props> = props => (
    <InnerTable>
        <tr><td>基礎値</td><td>{props.base.toString()}</td></tr>
        {
            props.additional.greaterThan(0) ?
            <tr><td>追加値</td><td>{props.additional.toString()}</td></tr> :
            null
        }
        <tr><td>熟練度</td><td><Mastery perMastery={MovementSpeedPerMastery} mastery={props.movementMastery} name="移動熟練度" /></td></tr>
    </InnerTable>
)

export default movementSpeed;