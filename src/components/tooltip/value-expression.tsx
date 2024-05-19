import * as React from "react";
import style from "./tooltip.module.styl";
import { FormattedMessage } from "react-intl";
import { ValueRatio } from "app-types/value-ratio";

type Props = {
    id: keyof ValueRatio
    className?: string
    ratio: number
    brackets?: boolean
}

const defaultDictionary: {[key: string]: {key: string, className: string}} = {
    base: {key: "app.value.base", className: style.emphasis},
    maxHP: {key: "app.value.maxhp", className: style.maxhp},
    additionalMaxHP: {key: "app.value.additional-maxhp", className: style.maxhp},
    attack: {key: "app.value.attack", className: style.attack}
}

const valueExpression: React.FC<Props> = props => {
    console.log(props.id)
    const def = defaultDictionary[props.id];
    
    return (
        <span className={props.className ?? def.className}>
            {props.brackets ? "(+" : null}
            <FormattedMessage id={def.key} values={{ratio: props.ratio.toString()}} />
            {props.brackets ? ")" : null}
        </span>
    )
};

export default valueExpression;