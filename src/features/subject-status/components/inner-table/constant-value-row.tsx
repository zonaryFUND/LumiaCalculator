import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";

type Props = {
    labelIntlID: string
    value: Decimal.Value
    percent?: boolean
}

const ConstantValueRow: React.FC<Props> = ({ labelIntlID, percent, value }) => {
    return (
        <tr>
            <td><FormattedMessage id={labelIntlID} /></td>
            <td>{value.toString()}{percent}</td>
        </tr>
    )
}

export default ConstantValueRow;
