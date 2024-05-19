import * as React from "react";
import style from "./tooltip.module.styl";
import { FormattedMessage } from "react-intl";
import { ValueElement, ValueRatio } from "app-types/value-ratio";

type Props = {
    id: keyof ValueRatio
    className?: string
    level?: number
    ratio: ValueElement
    brackets?: boolean
}

const defaultDictionary: {[key: string]: {key: string, className: string}} = {
    base: {key: "app.value.base", className: style.emphasis},
    maxHP: {key: "app.value.maxhp", className: style.maxhp},
    additionalMaxHP: {key: "app.value.additional-maxhp", className: style.maxhp},
    attack: {key: "app.value.attack", className: style.attack},
    additionalAttack: {key: "app.value.additional-attack", className: style.attack},
    basicAttackAmp: {key: "app.value.basic-attack-amp", className: style.attack},
    amp: {key: "app.value.skill-amp", className: style.amp},
    targetMaxHP: {key: "app.value.target-maxhp", className: style.maxhp},
    targetHP: {key: "app.value.target-hp", className: style.maxhp}
}

const ValueExpression: React.FC<Props> = props => {
    const def = defaultDictionary[props.id];
    const value = (() => {
        if (typeof props.ratio === "number") return props.ratio;
        if (Array.isArray(props.ratio)) return props.ratio[props.level ?? 0];
        return (
            <>
            {
                Object.entries(props.ratio).map(([key, value]) => 
                    <ValueExpression key={key} id={key as keyof ValueRatio} level={props.level} ratio={value}  />        
                )
            }
            </>
        )
    })();
    
    return (
        <span className={props.className ?? def.className}>
            {
                props.brackets ? 
                props.id == "basicAttackAmp" ? "*(" : "(+" 
                : null
            }
            <FormattedMessage id={def.key} values={{ratio: value}} />
            {props.brackets ? ")" : null}
        </span>
    )
};

export default ValueExpression;