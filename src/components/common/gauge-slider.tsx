import * as React from "react";
import style from "./gauge-slider.module.styl";
import { styles } from "@app/util/style";

export type GaugeStyle = 
    { type: "stack" } |
    { type: "hp-ratio" } |
    { type: "gauge", threshold?: number, changeColorOnMax?: boolean }
    

type Props = {
    /**
     * スライダーの定義済みスタイル
     */
    style: GaugeStyle
    /**
     * スライダーの現在値％（0〜100）
     */
    percentage: number
    /**
     * スライダーの値を変更するコールバック
     */
    setPercentage: (percentage: number) => void
    /**
     * 最大値（このコンポーネントにおいては体力での目盛り表示でしか使わない）
     */
    max?: number
}

/**
 * デザイン済みスライダーコンポーネント
 * 体力、永続スタック（ナディンのスタックなど）、変動ゲージ（エキオン暴走、ブレアの気力など）の3種類のデザインに対応
 * 値の修正はthrottleによって遅延して反映される
 */
const gaugeSlider: React.FC<Props> = props => {
    const stopPropagation: React.TouchEventHandler<HTMLInputElement> = React.useCallback(e => {
        e.stopPropagation();
    }, [])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        props.setPercentage(+e.currentTarget.value);
    }, []);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const ulRef = React.useRef<HTMLUListElement>(null);
    React.useEffect(() => {
        inputRef.current?.style.setProperty("--value", `${props.percentage}%`);
        if (props.style.type == "gauge") {
            inputRef.current?.style.setProperty(
                "--color", 
                props.style.changeColorOnMax && props.percentage == 100 ? "red" : 
                props.percentage >= (props.style.threshold ?? 0) ? "yellow" : 
                "white"
            );
        } else if (props.style.type == "hp-ratio") {
            inputRef.current?.style.setProperty("--color", "yellowgreen");
        }
    }, [props.percentage])

    return (
        <label className={styles(style.slider, style[props.style.type == "hp-ratio" ? "hp" : props.style.type])}>
            <input 
                type="range" 
                value={props.percentage} 
                step={1} 
                max={100} 
                onTouchMove={stopPropagation}
                onChange={onChange}
                ref={inputRef}
            />
            <ul ref={ulRef}>
                {
                    (() => {
                        // スライダー上に目盛りを表示する
                        // 体力の場合は100ごとに小目盛り、50ごとに中目盛り、100ごとに大目盛り（スタイルシートのnth-childで大きさが変更される）
                        // スタックの場合は最大値を10分割する同じ大きさの目盛り
                        // ゲージの場合は最大値を10分割する同じ大きさの目盛り、かつ閾値に大目盛り
                        const s = props.style;
                        switch (s.type) {
                            case "hp-ratio": return [...Array(Math.floor((props.max ?? 0) / 100) + 1)].map((_, i) => <li key={i} />);
                            case "stack": return [...Array(11)].map((_, i) => <li key={i} />);
                            case "gauge": return [...Array(11)].map((_, i) => <li key={i} className={i == (s.threshold ?? 0) / 10 ? style.threshold : undefined} />);
                        }
                    })()
                }
            </ul>
        </label>
    )
}

export default gaugeSlider;