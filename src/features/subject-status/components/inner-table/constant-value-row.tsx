import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import style from "./row-highlight.module.styl";

type Props = {
    labelIntlID: string
    value: Decimal.Value
    showPercent?: boolean
    highlight?: boolean
}

const ConstantValueRow: React.FC<Props> = ({ labelIntlID, showPercent, value, highlight }) => {
    return (
        <tr className={highlight ? style.temporary : undefined}>
            <td><FormattedMessage id={labelIntlID} /></td>
            <td>{value.toString()}{showPercent ? "%" : ""}</td>
        </tr>
    )
}

export default ConstantValueRow;
