import * as React from "react";
import table from "components/common/table.module.styl";

type HeaderCell = {
    content: React.ReactNode
    /**
     * このヘッダーセルのcolSpan（省略時1）
     */
    colSpan?: number
}

type Props = {
    /**
     * サブテーブルのラベル（呼び出し側で<FormattedMessage>等を組み立てて渡す）
     */
    label: React.ReactNode

    /**
     * ラベルセルのcolSpan（省略時1）
     */
    labelColSpan?: number

    /**
     * 値側のヘッダーセル。全体で常に4列（ラベル列 + 値側ヘッダーの合計colSpan = 4）になるよう、
     * 呼び出し側がlabelColSpanと合わせて指定する。
     * 例：基本攻撃のように「標準値/致命打/期待値」を独立した3列で見せたいカテゴリは
     * colSpan省略（各1列）の3要素、実験体スキル等のように値側をまとめて1列扱いにしたいカテゴリは
     * colSpan:3の1要素、といった形で使い分ける
     */
    valueHeaders: HeaderCell[]
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
    return (
        <tbody>
            <tr className={table.separator}>
                <td colSpan={props.labelColSpan}>{props.label}</td>
                {props.valueHeaders.map((header, index) => (
                    <td key={index} colSpan={header.colSpan}>{header.content}</td>
                ))}
            </tr>
            {
                props.unitsChunks.flatMap((units, index) => {
                    // 直前までのチャンクの内容に関わらず、このチャンク自体が1件も描画しない場合は
                    // 区切り線だけが浮いてしまうため、そのチャンクの区切り線は省略する
                    if (index > 0 && units.length > 0) {
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
