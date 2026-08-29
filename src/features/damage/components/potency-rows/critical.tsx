import Decimal from "decimal.js";
import * as React from "react";
import { useToggle } from "react-use";
import style from "./row.module.styl";
import table from "components/common/table.module.styl";
import { FormattedMessage } from "react-intl";

type Props = {
    labelIntlID: string;
    regularDamage: Decimal;
    criticalDamage?: Decimal;
    expectedValue?: Decimal;
    /**
     * 値セルに適用するクラス（省略時は基本攻撃属性を表す`style.basic`）
     */
    valueClass?: string;
    subtable: React.ReactNode;
}

const Critical: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const valueClass = props.valueClass ?? style.basic;

    return (
        <>
            <tr onClick={toggleExpand}>
                <td><FormattedMessage id={props.labelIntlID} /></td>
                <td className={valueClass}>{props.regularDamage.floor().toString()}</td>
                <td className={valueClass}>{props.criticalDamage?.floor().toString() ?? "-"}</td>
                <td className={valueClass}>{props.expectedValue?.floor().toString() ?? "-"}</td>
            </tr>
            <tr className={table.expand} style={expand ? undefined : {display: "none"}}>
                <td colSpan={4}>
                    {props.subtable}
                </td>
            </tr>
        </>
    )
}

export default Critical;