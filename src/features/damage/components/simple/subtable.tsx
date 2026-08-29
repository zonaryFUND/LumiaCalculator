import * as React from "react";
import table from "components/common/table.module.styl";

type Props = {
    /**
     * サブテーブルのラベル（呼び出し側で<FormattedMessage>等を組み立てて渡す）
     */
    label: React.ReactNode

    /**
     * 値側のヘッダーセル。要素数に応じてラベル列のcolSpanが決まる（全体4列固定）。
     * 例：基本攻撃のように「標準値/致命打/期待値」の3列を要求するカテゴリは3要素、
     * それ以外の通常のカテゴリは1要素（標準値のみ）を渡す
     */
    valueHeaders: React.ReactNode[]
    unitsChunks: React.ReactElement[][]
}

/**
 * ダメージ・効果量表示テーブルについて、1まとまりの単位のtbodyを構成するコンポーネント
 * 例：基本攻撃系統の効果量をまとめたtbody
 *
 * カテゴリ（基本攻撃・実験体スキル・武器スキル等）に依存しない共通View。
 * カテゴリ固有のヘッダー列数・raw unitからのReactElement変換は呼び出し側が担う。
 */
const SubTable: React.FC<Props> = props => {
    const labelColSpan = 4 - props.valueHeaders.length;
    const head = <>
        <td colSpan={labelColSpan > 1 ? labelColSpan : undefined}>{props.label}</td>
        {props.valueHeaders.map((header, index) => <td key={index}>{header}</td>)}
    </>;

    return (
        <tbody>
            <tr className={table.separator}>
                {head}
            </tr>
            {
                props.unitsChunks.flatMap((units, index) => {
                    if (index > 0) {
                        return [
                            <tr key={`separator-${index}`} className={table.border}>
                                <td colSpan={4}></td>
                            </tr>,
                            ...units
                        ];
                    } else {
                        return units;
                    }
                })
            }
        </tbody>
    )
}

export default SubTable;