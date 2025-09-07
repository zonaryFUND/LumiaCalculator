import * as React from "react";
import { useValueContext, useValueContextOptional } from "./value-context";
import { calculateValue, extractSkillLevel, ValueOrigin } from "app-types/value-ratio";
import { ValueRatio } from "app-types/value-ratio";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import style from "./tooltip.module.styl";
import ValueExpression from "./value-expression";
import Decimal from "decimal.js";

type OverrideKey = keyof ValueRatio | "result"

type Props = {
    ratio: ValueRatio
    origin: ValueOrigin
    multiplier?: number
    overrideExpression?: Partial<{[K in OverrideKey]: {format?: string, className?: string}}> |
        ((key: keyof ValueRatio) => (value: number | React.ReactNode) => React.ReactNode | undefined)
}

const value: React.FC<Props> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    const skillLevel = config != undefined ? extractSkillLevel(config, props.origin) : undefined;

    if (showEquation || config == undefined || status == undefined) {
        return Object.entries(props.ratio).map(([key, value], index) => {
            const override = (() => {
                if (typeof props.overrideExpression === "function") {
                    return props.overrideExpression(key as keyof ValueRatio);
                }

                if (typeof props.overrideExpression === "object") {
                    return props.overrideExpression[key as keyof ValueRatio];
                }

                return undefined
            })();

            return <ValueExpression 
                key={key} 
                id={key as keyof ValueRatio} 
                skillLevel={skillLevel} 
                ratio={value} 
                brackets={index != 0} 
                override={override} 
            />;
        });
    } else {
        const { static: staticBaseValue, dynamic: dynamicBaseValue　} = calculateValue(props.ratio, status, config, props.origin);
        const { staticValue, dynamicValue } = (() => {
            const dynamicValue = dynamicBaseValue == undefined ? undefined :
                Object.entries(dynamicBaseValue).reduce((prev, [key, value]) => {
                    return {
                        ...prev,
                        [key]: value.percent(props.multiplier || 100).floor()
                    }
                }, {} as typeof dynamicBaseValue)
            return {
                staticValue: staticBaseValue.percent(props.multiplier || 100).floor(),
                dynamicValue
            }
        })();

        const resultClass = typeof props.overrideExpression === "object" ? props.overrideExpression.result?.className : undefined;
        return (
            <>
                {staticValue.isZero() ? null : <span className={resultClass ?? style.emphasis}>{staticValue.toString()}</span>}
                {
                    dynamicValue ?
                    Object.entries(dynamicValue).map(([key, value], index) => {
                        const override = typeof props.overrideExpression === "object" ? props.overrideExpression?.[key as keyof ValueRatio] : undefined
                        return <ValueExpression key={key} id={key as keyof ValueRatio} skillLevel={skillLevel} ratio={value.toNumber()} brackets={index != 0 || !staticBaseValue.isZero()} override={override} />
                    })
                    : null
                }
            </>
        )
    }
};

export default value;