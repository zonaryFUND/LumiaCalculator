import * as React from "react";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import style from "./content.module.styl";

type Props = {
    pcHeader?: React.ReactElement
    children: React.ReactElement | React.ReactElement[]
}

const content: React.FC<Props> = props => {
    const uiType = useResponsiveUIType()

    return (
        <div className={uiType == "mobile" ? style.mobile : style.pc}>
            {
                uiType == "mobile" ? null : props.pcHeader
            }
            {props.children}
        </div>
    )
};

export default content;