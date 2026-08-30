import * as React from "react";
import Decimal from "decimal.js";
import style from "./buff-delta.module.styl";

type Props = {
    /**
     * バフ・デバフをすべて除いた場合の値
     */
    baseline: Decimal
    /**
     * 現在の最終値
     */
    value: Decimal
    percent?: boolean
}

/**
 * ステータステーブルのメインセルに付与する「バフ・デバフによる増減」の表示。
 * `baseline`と`value`が等しい（バフ・デバフの影響がない）場合は何も表示しない。
 * 差分部分のみ、プラスなら緑・マイナスなら赤で色付けする（暫定の配色、後日調整予定）
 */
const BuffDelta: React.FC<Props> = ({ baseline, value, percent }) => {
    const delta = value.minus(baseline);
    if (delta.isZero()) return null;

    const unit = percent ? "%" : "";
    const operator = delta.greaterThan(0) ? "+" : "-";
    const colorClass = delta.greaterThan(0) ? style.positive : style.negative;

    return (
        <span className={style.delta}>
            ({baseline.toString()}{unit} <span className={colorClass}>{operator} {delta.abs().toString()}{unit}</span>)
        </span>
    );
};

export default BuffDelta;
