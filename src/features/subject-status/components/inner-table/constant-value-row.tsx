import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";

type Props = {
    labelIntlID: string
    value: Decimal.Value
    showPercent?: boolean
}

const ConstantValueRow: React.FC<Props> = ({ labelIntlID, showPercent, value }) => {
    return (
        <tr>
            <td><FormattedMessage id={labelIntlID} /></td>
            <td>{value.toString()}{showPercent ? "%" : ""}</td>
        </tr>
    )
}

export default ConstantValueRow;
