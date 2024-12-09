import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import * as React from "react";
import style from "./index.module.styl";

type Props = {
    children: React.ReactElement
}

const base: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();

    return (
        <main 
            className={uiType == "mobile" ? style.mobilebase : style.pcbase} 
            style={uiType == "mobile" ? undefined : {paddingLeft: uiType == "full" ? 266 : 80}}
        >
            {props.children}
        </main>
    )
}

export default base;