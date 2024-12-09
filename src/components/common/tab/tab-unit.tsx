import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import * as React from "react";
import style from "./tab-unit.module.styl";
import { styles } from "@app/util/style";

type Props = {
    title: string
    className?: string
    children: React.ReactElement | React.ReactElement[]
}

const tabUnit: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();

    return (
        <div 
            className={styles(uiType == "mobile" ? style.mobiletab : style.pctab, style.tab, props.className)}
        >
            {
                uiType == "mobile" ? null :
                <header>
                    <h1>{props.title}</h1>
                </header>
            }
            <div className={style.content}>
                {props.children}
            </div>
        </div>
    )
}

export default tabUnit;