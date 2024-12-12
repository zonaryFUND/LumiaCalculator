import * as React from "react";
import style from "./tooltip.module.styl";
import { FormattedMessage } from "react-intl";
import { RatioKeys, ValueElement, ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";
import { useValueContext, useValueContextOptional } from "./value-context";
import attackSpeed from "components/status/chunks/attack-speed";

type Props = {
    id: RatioKeys
    level?: number
    ratio: ValueElement
    criticalMultiplier?: Decimal
    brackets?: boolean
    override?: {
        format?: string
        className?: string
    } | ((value: number | React.ReactNode) => React.ReactNode)
}

const defaultDictionary: {[key: string]: {key: string, className: string}} = {
    base: {key: "app.value.base", className: style.emphasis},
    level: {key: "app.value.level", className: style.level},
    maxHP: {key: "app.value.maxhp", className: style.maxhp},
    additionalMaxHP: {key: "app.value.additional-maxhp", className: style.maxhp},
    maxSP: {key: "app.value.maxsp", className: style.maxsp},
    defense: {key: "app.value.defense", className: style.defense},
    attack: {key: "app.value.attack", className: style.attack},
    additionalAttack: {key: "app.value.additional-attack", className: style.attack},
    basicAttackAmp: {key: "app.value.basic-attack-amp", className: style.attack},
    criticalChance: {key: "app.value.critical-chance", className: style.critical},
    amp: {key: "app.value.skill-amp", className: style.amp},
    stack: {key: "app.value.stack", className: style.strong},
    targetMaxHP: {key: "app.value.target-maxhp", className: style.maxhp},
    targetHP: {key: "app.value.target-hp", className: style.maxhp},
    lostHP: {key: "app.value.lost-hp", className: style.losthp},
    targetLostHP: {key: "app.value.target-lost-hp", className: style.losthp},
    summonedAttack: {key: "app.value.summoned-attack", className: style.attack},
    attackSpeed: {key: "app.value.attack-speed", className: style.attackspeed}
}

const ValueExpression: React.FC<Props> = props => {
    const { status } = useValueContextOptional();
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

    const className = typeof props.override === "object" ? props.override.className : def?.className;
    const format = typeof props.override === "object" ? props.override.format : undefined
    const overrideNode = typeof props.override === "function" ? props.override(value) : null;
    
    return (
        <span className={className}>
            {
                props.brackets ? 
                props.id == "basicAttackAmp" ? "*(" : 
                props.id == "criticalChance" ? `+${status!.criticalStrikeChance.calculatedValue.percent(value as number).toString()}% = (` : "(+" 
                : null
            }
            {
                format?.split(/({ratio})/)
                    .map(component => {
                        if (component.startsWith("{") && component.endsWith("}")) {
                            return <span className={className}>{value}</span>
                        } else {
                            return component
                        }
                    }) ??
                overrideNode ??
                <FormattedMessage id={def?.key} values={{ratio: value}} />    
            }
            {props.brackets ? ")" : null}
        </span>
    )
};

export default ValueExpression;