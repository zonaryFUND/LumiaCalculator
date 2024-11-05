import Decimal from "decimal.js";
import React, * as Raect from "react";

type Props = {
    baseDamage: Decimal
    ratio: number
    calculated: Decimal
}

const damageDependentHeal: React.FC<Props> = props => (
    <td></td>
);

export default damageDependentHeal;
