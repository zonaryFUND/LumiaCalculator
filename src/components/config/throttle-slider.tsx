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
    descrpitedMaxValue?: number
    changeColorOnMax: boolean
}

const throttleSlider: React.FC<Props> = props => {
    const [tempPercentage, setTempPercentage] = React.useState(100);
    const [,] = useDebounce(
        () => {
            props.value[1](Math.round(props.max * tempPercentage / 100));
        },
        500,
        [tempPercentage]
    );

    const stopPropagation: React.TouchEventHandler<HTMLInputElement> = React.useCallback(e => {
        e.stopPropagation();
    }, [])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        setTempPercentage(+e.currentTarget.value);
    }, []);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const ulRef = React.useRef<HTMLUListElement>(null);
    React.useEffect(() => {
        inputRef.current?.style.setProperty("--value", `${tempPercentage}%`);
        if (props.style == "gauge") {
            inputRef.current?.style.setProperty(
                "--color", 
                props.changeColorOnMax && tempPercentage == props.max ? "red" : 
                tempPercentage >= (props.threshold ?? 0) ? "yellow" : 
                "white"
            );
        } else if (props.style == "hp") {
            inputRef.current?.style.setProperty("--color", "yellowgreen");
        }
    }, [tempPercentage])

    return (
        <div className={style.slider}>
            <h4>{props.label} <span>{Math.round(props.max * tempPercentage / 100 * (props.descrpitedMaxValue ?? 100) / 100)}</span></h4>
            <label className={style[props.style]}>
                <input 
                    type="range" 
                    value={tempPercentage} 
                    step={1} 
                    max={100} 
                    onTouchMove={stopPropagation}
                    onChange={onChange}
                    ref={inputRef}
                />
                <ul ref={ulRef}>
                    {
                        props.style == "hp" ? [...Array(Math.floor(props.descrpitedMaxValue! / 100) + 1)].map((_, i) => <li key={i} />) :
                        props.style == "stack" ? [...Array(11)].map((_, i) => <li key={i} />) :
                        [...Array(11)].map((_, i) => <li key={i} className={i == (props.threshold ?? 0) / 10 ? style.threshold : undefined} />)
                    }
                </ul>
            </label>
        </div>
    )
}

export default throttleSlider;