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
    expectedValue: Decimal;
    subtable: React.ReactNode;
}

const Critical: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    return (
        <>
            <tr onClick={toggleExpand}>
                <td><FormattedMessage id={props.labelIntlID} /></td>
                <td className={style.basic}>{props.regularDamage.floor().toString()}</td>
                <td className={style.basic}>{props.criticalDamage?.floor().toString() ?? "-"}</td> 
                <td className={style.basic}>{props.expectedValue.floor().toString()}</td>
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