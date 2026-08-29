import * as React from "react";
import table from "components/common/table.module.styl";
import { useToggle } from "react-use";

type Props = {
    label: React.ReactNode;
    value: React.ReactNode;
    valueClass?: string;
    /**
     * 展開時に表示する詳細計算式。呼び出し側で既に<InnerTable>によってラップされた
     * 完全なコンテンツを渡すこと（`Critical`コンポーネントと同じ規約）。
     * ここで再度<InnerTable>を被せると<table>が<tbody>直下に置かれる不正なマークアップになる。
     */
    subtable?: React.ReactNode;
}

const Standard: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    return (
        <>
            <tr onClick={props.subtable ? toggleExpand : undefined}>
                <td>{props.label}</td>
                <td colSpan={3} className={props.valueClass}>{props.value}</td>
            </tr>
            {
                props.subtable ?
                <tr className={table.expand} style={!expand ? {display: "none"} : undefined}><td colSpan={4}>
                    {props.subtable}
                </td></tr> :
                null
            }
        </>
    )
}

export default Standard;