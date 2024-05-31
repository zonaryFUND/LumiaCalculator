import { ValueRatio } from "app-types/value-ratio";
import Value from "components/tooltip/value";
import { useValueContext } from "components/tooltip/value-context";
import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    skill: "Q" | "W" | "E" | "R" | "T"
    ratio: ValueRatio
}

const leniValue: React.FC<Props> = props => {
    return <Value {...props} overrideExpression={(key) => (value) => {
        if (key == "level") {
            return <span className={style.level}>レニのレベル <span className={style.emphasis}>* {value}</span></span>
        } else {
            return undefined;
        }
    }} />
};

export default leniValue;