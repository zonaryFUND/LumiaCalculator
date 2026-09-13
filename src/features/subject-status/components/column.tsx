import * as React from "react";
import Decimal from "decimal.js";
import TableRow, { HideZeroValueContext } from "components/common/table-row";
import style from "components/common/table.module.styl";
import BuffDelta from "./buff-delta.view";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal | React.ReactElement
    /**
     * バフ・デバフをすべて除いた場合の値。`value`がDecimalのときのみ、末尾に増減量の表示を追加する
     * （`value`が複合表示のReactElementのステータス（クールダウン系）では対象外）
     */
    baseline?: Decimal
    percent?: boolean
    expand?: React.ReactNode
    isHidden?: boolean
    /**
     * この項目の説明ツールチップの内容を示すreact-intlメッセージID（`components/common/table-row.tsx`の
     * `Props.descriptionIntlID`参照）。指定するとPC版は長めのホバー、モバイル版はダブルタップで表示する
     */
    descriptionIntlID?: string
}

const column: React.FC<ColumnProps> = props => {
    const hideZeroValue = React.useContext(HideZeroValueContext);

    // ReactElement（クールダウン系の複合表示など）は「値がゼロか」を一般的に判定できないため対象外とする
    const isZeroValue = !("props" in props.value) && props.value.isZero();

    return <TableRow
        content={
            <>
                <td className={style.label}>{props.name}</td>
                <td className={style.value}>{
                    "props" in props.value ?
                    props.value :
                    <>
                        {props.value.toString()}{props.percent ? "%" : ""}
                        {props.baseline != undefined ? <BuffDelta baseline={props.baseline} value={props.value} percent={props.percent} /> : null}
                    </>
                }</td>
            </>
        }
        expand={props.expand}
        isHidden={props.isHidden || (hideZeroValue && isZeroValue)}
        descriptionIntlID={props.descriptionIntlID}
    />
}

export default column;