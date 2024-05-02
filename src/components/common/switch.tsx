import { StateProps } from "@app/util/state";
import * as React from "react";
import style from "./switch.module.styl";

const switchView: React.FC<StateProps<boolean>> = props => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(e => {
        props[1](e.currentTarget.checked);
    }, []);

    return (
        <input className={style.switch} type="checkbox" checked={props[0]} onChange={onChange} />
    );
}

export default switchView;