import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    /**
     * 増加前の基礎ダメージ量
     */
    baseValue: Decimal

    /**
     * 発生源を表示するための翻訳テキストID
     */
    labelIntlID?: string

    /**
     * 増加効果量（％）
     */
    ratio: Decimal

    /**
     * ％表記するかどうか
     */
    percent?: boolean
}

/**
 * 与ダメージ増加効果を乗算する計算式行
 *
 * 増幅ドローンと予熱-増幅の同時発動のように、複数の発生源が同時に成立しうるため、発生源ごとの
 * `labelIntlID`（バフ・デバフ定義の`intlID`）をラベルとして表示する（React要素のkeyとしても
 * 一意性を確保する目的を兼ねる。同一の汎用ラベルを複数行に共有すると、どの発生源による増加か
 * 判別できなくなるため）
 */
const damageIncrease: React.FC<Props> = props => (
    <tr>
        <td>{props.labelIntlID ? <FormattedMessage id={props.labelIntlID} /> : <FormattedMessage id="status.damage-increase" />}</td>
        <td>{props.baseValue.toString()} x {props.ratio.toString()}% = {props.baseValue.percent(props.ratio).toString()}{props.percent ? "%" : null}</td>
    </tr>
)

export default damageIncrease;
