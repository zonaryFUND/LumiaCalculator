import Decimal from "decimal.js";
import * as React from "react";
import InnerTable from "./inner-table";
import { BaseBasicAttackRange } from "../standard-values";

type Props = {
    weapon: Decimal
    additional: Decimal
}

const basicAttackRange: React.FC<Props> = props => (
    <InnerTable>
        <tr><td>基礎値</td><td>{BaseBasicAttackRange.toString()}</td></tr>
        {
            props.weapon.greaterThan(0) ?
            <tr><td>武器</td><td>{props.weapon.toString()}</td></tr> :
            null
        }
        {
            props.additional.greaterThan(0) ?
            <tr><td>追加値</td><td>{props.additional.toString()}</td></tr> :
            null
        }
    </InnerTable>
)

export default basicAttackRange;