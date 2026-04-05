import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import style from "./sum-and-multiply-row.module.styl";
import table from "components/common/table.module.styl";

type Props = {
    labelIntlID: string
    constant: Decimal.Value
    a: Decimal.Value
    b: {
        labelIntlID: string
        value: Decimal.Value
        showMinusOne?: boolean
    }
    result: Decimal.Value
    percent?: boolean
}

// 基礎値+掛け算（レベル比例値など）で算出されるステータス構成値の表示行
// constant + a x b = result
// %表記を行う場合、resultにのみ%を付与する
const SumAndMultipliedRow: React.FC<Props> = ({ labelIntlID, constant, a, b, result, percent }) => {
    const bLabel = <span className={table.small}><FormattedMessage id={b.labelIntlID} /></span>;
    const bValue = b.showMinusOne ? <>({b.value.toString()} - 1)</> : <>{b.value.toString()}</>;
    const mulResult = new Decimal(a).mul(b.value);

    return (
        <tr>
            <td><FormattedMessage id={labelIntlID} /></td>
            <td>
                <>{constant.toString()} + </>
                {mulResult.toString()}<span className={style.multiply}>({a.toString()} x {bLabel}{bValue})</span>
                <> = {result.toString()}{percent}</>
            </td>
        </tr>
    )
}

export default SumAndMultipliedRow;