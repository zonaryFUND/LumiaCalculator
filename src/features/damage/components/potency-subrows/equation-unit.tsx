import * as React from "react";
import Decimal from "decimal.js";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";

type Props = {
    labelIntlID: string
    ratio: React.ReactElement
    currentValue: Decimal.Value
    percent?: boolean
}

const EquationUnit: React.FC<Props> = ({labelIntlID, ratio, currentValue, percent}) => {
    return (
        <>
            <span className={table.small}><FormattedMessage id={labelIntlID} /></span>
            {currentValue.toString()} x {ratio}{percent ? "%" : ""}
        </>
    )
}

export default EquationUnit;