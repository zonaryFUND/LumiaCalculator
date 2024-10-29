import * as React from "react";
import Decimal from "decimal.js";
import TableRow from "components/common/table-row";
import style from "components/common/table.styl";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal
    percent?: boolean
    expand?: React.ReactNode
    isHidden?: boolean
}

const column: React.FC<ColumnProps> = props => {
    return <TableRow
        content={
            <>
                <td className={style.label}>{props.name}</td>
                <td className={style.value}>{props.value.toString() + (props.percent ? "%" : "")}</td>
            </>
        }
        expand={props.expand}
        isHidden={props.isHidden}
    />
}

export default column;