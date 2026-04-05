import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import table from "components/common/table.module.styl";

type Props = {
    labelIntlID: string
    a: Decimal.Value
    b: {
        labelIntlID: string
        value: Decimal.Value
        showMinusOne?: boolean
    }
    result: Decimal.Value
    percent?: boolean
}

// 単純な掛け算（レベル比例値など）で算出されるステータス構成値の表示行
// a x b = result
// %表記を行う場合、aにのみ%を付与する
const MultipliedRow: React.FC<Props> = ({ labelIntlID, a, b, result, percent }) => {
    const bLabel = <span className={table.small}><FormattedMessage id={b.labelIntlID} /></span>;
    const bValue = b.showMinusOne ? <>({b.value.toString()} - 1)</> : <>{b.value.toString()}</>;

    return (
        <tr>
            <td><FormattedMessage id={labelIntlID} /></td>
            <td>
                <>{a.toString()}{percent} x {bLabel}{bValue}</>
                <> = {result.toString()}{percent}</>
            </td>
        </tr>
    )
}

export default MultipliedRow;