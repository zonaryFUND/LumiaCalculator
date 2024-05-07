import { StateProps } from "@app/util/state";
import * as React from "react";
import style from "./tab-selector.module.styl";

type Props = {
    tabs: string[]
    tab: StateProps<number>
}

const tabSelector: React.FC<Props> = props => {
    const baseRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const selected = baseRef.current?.children.item(props.tab[0]) as any;
        if (selected) {
            baseRef.current?.style.setProperty("--highlight-width", `${selected.offsetWidth}px`);
            baseRef.current?.style.setProperty("--highlight-x-pos", `${selected.offsetLeft}px`);
        }
    }, [props.tab[0]]);

    return (
        <div className={style.selector} ref={baseRef}>
            {
                props.tabs.map((tab, i) => (
                    <button key={tab} className={i == props.tab[0] ? style.selected : undefined} onClick={() => props.tab[1](i)}>{tab}</button>
                ))
            }
        </div>
    )
};

export default tabSelector;