import * as React from "react";
import { StateProps } from "@app/util/state";
import style from "./segmented-control.module.styl";
import { useBoolean } from "react-use";
import { styles } from "@app/util/style";

type Props = {
    name: string
    segments: {
        title: string
        value: string
    }[]
    value: StateProps<string | undefined>
}

const segmentedControl: React.FC<Props> = props => {
    const controlRef = React.useRef<HTMLDivElement>(null);
    const [transition, setTransition] = useBoolean(false);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
        props.value[1](event.target.value)
        controlRef.current?.style.setProperty("--highlight-width", `${event.target.parentElement?.offsetWidth}px`);
        controlRef.current?.style.setProperty("--highlight-x-pos", `${event.target.parentElement?.offsetLeft}px`);
    }, []);

    React.useLayoutEffect(() => {
        const defaultLabel = controlRef.current?.getElementsByClassName(style.active)[0] as HTMLElement;
        controlRef.current?.style.setProperty("--highlight-width", `${defaultLabel?.offsetWidth}px`);
        controlRef.current?.style.setProperty("--highlight-x-pos", `${defaultLabel?.offsetLeft}px`);
        setTransition(true);
    }, [])

    return (
        <div className={styles(style.segment, transition ? style.transition : undefined)} ref={controlRef}>
            {
                props.segments.map(segment => (
                    <label key={segment.value} className={styles(segment.value == props.value[0] ? style.active : undefined, transition ? style.transition : undefined)}>
                        {segment.title}
                        <input 
                            type="radio" 
                            name={props.name}
                            value={segment.value}
                            checked={segment.value == props.value[0]} 
                            onChange={onChange}
                        />        
                    </label>
                ))
            }
        </div>
    )
};

export default segmentedControl;