import * as React from "react";
import table from "components/common/table.module.styl";
import { FormattedMessage } from "react-intl";

type Props = {
    labelIntlID: string
    displayCriticalHead: boolean
    unitsChunks: React.ReactElement[][]
}

/**
 * ダメージ・効果量表示テーブルについて、1まとまりの単位のtbodyを構成するコンポーネント
 * 例：基本攻撃系統の効果量をまとめたtbody
 */
const SubTable: React.FC<Props> = props => {
    const head = (() => {
        if (props.displayCriticalHead) {
            // 通常威力・クリティカル威力・期待値の3値のヘッダを表示
            return <>
                <td><FormattedMessage id={props.labelIntlID} /></td>
                <td><FormattedMessage id="app.standard-value" /></td>
                <td><FormattedMessage id="app.critical-hit" /></td>
                <td><FormattedMessage id="app.expected-value" /></td>
            </>
        } else {
            // 単一威力のみのヘッダを表示
            return <>
                <td colSpan={3}><FormattedMessage id={props.labelIntlID} /></td>
                <td><FormattedMessage id="app.standard-value" /></td>
            </>
        }
    })();

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