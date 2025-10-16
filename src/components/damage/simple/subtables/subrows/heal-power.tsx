import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    /**
     * 基礎回復量
     */
    baseValue: Decimal

    /**
     * 増加効果量（％）
     */
    healPower: Decimal

    /**
     * ％表記するかどうか（基礎回復量自体が対象最大体力％である場合、計算式行にも最後に％が付与される）
     */
    percent?: boolean
}

/**
 * 回復量増加効果を乗算する計算式行
 */
const healPower: React.FC<Props> = props => (
    <tr><td><FormattedMessage id="status.heal-power" /></td><td>{props.baseValue.toString()} x {props.healPower.toString()}% = {props.baseValue.percent(props.healPower).toString()}{props.percent ? "%" : null}</td></tr>
)

export default healPower;