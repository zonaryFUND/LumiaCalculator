import { StateProps } from "@app/util/state";
import * as React from "react";
import { useDebounce } from "react-use";
import style from "./slider-section.module.styl";
import GaugeSlider, { GaugeStyle } from "../../../components/slider/gauge-slider";

type Props = {
    /**
     * スライダーの定義済みスタイル
     * type:hp-ratio: 体力割合（単色）　真の最大値をmaxで指定し、valueは割合（0-100）で扱う
     * type:stack: ナディンなどが持つ永続スタック（単色）
     * type:gauge: エキオンの暴走、ブレアの気力などの増減ゲージ（閾値による色変化可能）
     */
    style: GaugeStyle
    /**
     * 表示名ラベル
     */
    label: string
    /**
     * 値State
     */
    value: StateProps<number>
    /**
     * 最大値（デフォルト：100）
     */
    max?: number

    /**
     * 表示上の最大値
     * 
     * デフォルトではmaxと同じだが、HPのように内部値と表示値を分けたい場合に使用する
     */
    displayMax?: number
}

/**
 * デザイン済みスライダーコンポーネントを含むセクション
 * スライダー値の変更を親コンポーネントに通知する際は、500msの遅延を伴う
 */
const SliderSection: React.FC<Props> = props => {
    const [tempPercentage, setTempPercentage] = React.useState(100);
    const [,] = useDebounce(
        () => {
            props.value[1](Math.round((props.max ?? 100) * tempPercentage / 100));
        },
        500,
        [tempPercentage]
    );

    return (
        <div className={style.slider}>
            <h4>{props.label} <span>{Math.round((props.displayMax ?? props.max ?? 100) * tempPercentage / 100)}</span></h4>
            <GaugeSlider
                style={props.style}
                percentage={tempPercentage}
                setPercentage={setTempPercentage}
                max={props.displayMax ?? props.max}
            />
        </div>
    )
}

export default SliderSection;