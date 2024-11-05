import Decimal from "decimal.js";
import React, * as Raect from "react";
import table from "components/common/table.styl";

type Props = {
    baseDamage: Decimal
    ratio: Decimal.Value
    calculated: Decimal
}

const damageDependentHeal: React.FC<Props> = props => (
    <td>
        <span className={table.small}>最終ダメージ</span>
        {props.baseDamage.toString()} x {props.ratio.toString()}% = {props.calculated.floor().toString()}
    </td>
);

export default damageDependentHeal;
