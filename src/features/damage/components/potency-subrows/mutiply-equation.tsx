import Decimal from "decimal.js";
import * as React from "react";
import table from "components/common/table.module.styl";
import { MultiplierExpression } from "../../damage-table-util";

type Props = {
    /**
     * 倍率計算式行自体のラベル（基本攻撃の基礎値・致命打それぞれについて倍率計算を表示すべき場合などに用いる）
     */
    label?: React.ReactElement

    /**
     * 倍率計算前の値
     */
    baseValue: Decimal

    /**
     * 倍率計算の各要素（レベル依存値をあらかじめ洗浄する必要がある）
     */
    multipliers: MultiplierExpression[]

    /**
     * 倍率計算後の最終値
     */
    finalValue: Decimal

    /**
     * ％表記するかどうか（複数段ヒットする対象最大体力依存攻撃などに用いる）
     */
    percent?: boolean
}

/**
 * ダメージ倍率の計算式行
 */
const multiplyEquation: React.FC<Props> = props => {
    const equation = props.multipliers.reduce((prev, current) => {
        if (current.label) {
            return <>{prev} x <span className={table.small}>{current.label}</span>{current.value}%</>
        } else {
            return <>{prev} x {current.value}%</>
        }
    }, <>{props.baseValue.toString()}</>);

    return <tr>
        <td>{props.label}</td>
        <td colSpan={props.label ? undefined : 2}>{equation} = {props.finalValue.toString()}{props.percent ? "%" : null}</td>
    </tr>
}

export default multiplyEquation;
