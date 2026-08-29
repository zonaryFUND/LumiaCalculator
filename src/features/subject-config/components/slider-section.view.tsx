import { StateProps } from "@app/util/state";
import * as React from "react";
import { useDebounce } from "react-use";
import style from "./slider-section.module.styl";
import GaugeSlider, { GaugeStyle } from "components/common/gauge-slider";

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

function percentageOf(value: number, max: number): number {
    return Math.round((value / max) * 100);
}

/**
 * デザイン済みスライダーコンポーネントを含むセクション
 * スライダー値の変更を親コンポーネントに通知する際は、500msの遅延を伴う
 */
const SliderSection: React.FC<Props> = props => {
    const [tempPercentage, setTempPercentage] = React.useState(() => percentageOf(props.value[0], props.max ?? 100));

    // このコンポーネント自身のデバウンス経由で書き込んだ値を記録しておく。
    // 実験体切替・プリセット読込などStore側が外部要因でvalueを変えた場合にのみ
    // 表示側(tempPercentage)を追従させ、自分自身の書き込みechoでは追従処理を起こさない。
    const lastCommittedValue = React.useRef(props.value[0]);

    React.useEffect(() => {
        if (props.value[0] !== lastCommittedValue.current) {
            lastCommittedValue.current = props.value[0];
            setTempPercentage(percentageOf(props.value[0], props.max ?? 100));
        }
    }, [props.value[0]]);

    const [,] = useDebounce(
        () => {
            const next = Math.round((props.max ?? 100) * tempPercentage / 100);
            // 直近のコミット値と一致する場合は書き込まない。
            // これにより、ユーザー操作を伴わないマウント直後の空コミットを防ぐ
            // （0-100%の整数ステップで丸めるため、max次第では厳密に一致しないことがある点に注意）
            if (next !== lastCommittedValue.current) {
                lastCommittedValue.current = next;
                props.value[1](next);
            }
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