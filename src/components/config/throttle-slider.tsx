import { StateProps } from "@app/util/state";
import * as React from "react";
import { useDebounce } from "react-use";

type Props = {
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
    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        setTempValue(+e.currentTarget.value);
    }, []);

    return (
        <div>
            <div>
                <h3>{props.label}</h3>
                <p>{Math.round(props.max * tempValue / 100)}</p>
            </div>
            <input type="range" value={tempValue} step={1} max={100} onChange={onChange} />
        </div>
    )
}

export default throttleSlider;