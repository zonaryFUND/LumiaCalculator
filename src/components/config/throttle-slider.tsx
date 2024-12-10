import { StateProps } from "@app/util/state";
import * as React from "react";
import { useDebounce } from "react-use";
import style from "./throttle-slider.module.styl";

type Props = {
    style: "stack" | "gauge" | "hp"
    threshold?: number
    label: string
    value: StateProps<number>
    max: number
}

const throttleSlider: React.FC<Props> = props => {
    const [tempValue, setTempValue] = React.useState(100);
    const [,] = useDebounce(
        () => {
            props.value[1](Math.round(props.max * tempValue / 100));
        },
        500,
        [tempValue]
    );

    const stopPropagation: React.TouchEventHandler<HTMLInputElement> = React.useCallback(e => {
        e.stopPropagation();
    }, [])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        setTempValue(+e.currentTarget.value);
    }, []);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const ulRef = React.useRef<HTMLUListElement>(null);
    React.useEffect(() => {
        inputRef.current?.style.setProperty("--value", `${tempValue}%`);
        if (props.style == "gauge") {
            inputRef.current?.style.setProperty(
                "--color", 
                tempValue == 100 ? "red" : tempValue >= (props.threshold ?? 0) ? "yellow" : "white"
            );
        } else if (props.style == "hp") {
            const ulWidth = Math.floor(props.max / 100) * 10000 / props.max;
            inputRef.current?.style.setProperty("--color", "yellowgreen");
            ulRef.current?.style.setProperty("width", `calc(${ulWidth}%`);
        }
    }, [tempValue])

    return (
        <div className={style.slider}>
            <h4>{props.label} <span>{Math.round(props.max * tempValue / 100)}</span></h4>
            <label className={style[props.style]}>
                <input 
                    type="range" 
                    value={tempValue} 
                    step={1} 
                    max={100} 
                    onTouchMove={stopPropagation}
                    onChange={onChange}
                    ref={inputRef}
                />
                <ul ref={ulRef}>
                    {
                        props.style == "hp" ? [...Array(Math.floor(props.max / 100) + 1)].map((_, i) => <li key={i} />) :
                        props.style == "stack" ? [...Array(11)].map((_, i) => <li key={i} />) :
                        [...Array(11)].map((_, i) => <li key={i} className={i == (props.threshold ?? 0) / 10 ? style.threshold : undefined} />)
                    }
                </ul>
            </label>
        </div>
    )
}

export default throttleSlider;