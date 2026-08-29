import Decimal from "decimal.js";
import * as React from "react";
import table from "components/common/table.module.styl";

type Props = {
    baseDamage: Decimal
    ratio: Decimal.Value
    calculated: Decimal
}

const damageDependentHeal: React.FC<Props> = props => (
    <tr>
        <td colSpan={2}>
            <span className={table.small}>最終ダメージ</span>
            {props.baseDamage.toString()} x {props.ratio.toString()}% = {props.calculated.floor().toString()}
        </td>
    </tr>
);

export default damageDependentHeal;
