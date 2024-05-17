import Decimal from "decimal.js";
import * as React from "react";
import InnerTable from "components/common/inner-table";
import Mastery from "../../status/expand/mastery";

type Props = {
    base: Decimal
    subject: Decimal
    weapon: Decimal
    perMastery: Decimal
    additional: Decimal
    weaponMastery: number
}

/*
const attackSpeed: React.FC<Props> = props => (
    <InnerTable>
        <tr><td>基礎値</td><td><span>実験体</span> {props.subject.toString()} + <span>武器</span> {props.weapon.toString()} = {props.base.toString()}</td></tr>
        {
            props.additional.greaterThan(0) ?
            <tr><td>追加値</td><td>{props.additional.toString()}％</td></tr> :
            null
        }
        <tr><td>熟練度</td><td><Mastery perMastery={props.perMastery} mastery={props.weaponMastery} name="武器熟練度" percent /></td></tr>
    </InnerTable>
)

export default attackSpeed;
*/