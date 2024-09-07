import * as React from "react";
import { useValueContext, useValueContextOptional } from "./value-context";
import { calculateValue } from "app-types/value-ratio/calculation";
import { ValueElement, ValueRatio } from "app-types/value-ratio";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import style from "./tooltip.module.styl";
import ValueExpression from "./value-expression";

type OverrideKey = keyof ValueRatio | "result"

type Props = {
    ratio: ValueRatio
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "other"
    multiplier?: number
    overrideExpression?: Partial<{[K in OverrideKey]: {format?: string, className?: string}}> |
        ((key: keyof ValueRatio) => (value: number | React.ReactNode) => React.ReactNode | undefined)
}

const value: React.FC<Props> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    const skillLevel = React.useMemo(() => {
        if (props.skill == "other") return undefined;
        if (props.skill == "D") return weaponSkillLevel(config!.weaponMastery);
        return config!.skillLevels[props.skill];
    }, [props.skill, config?.weaponMastery, config?.skillLevels]);

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
                level={skillLevel} 
                ratio={value} 
                brackets={index != 0} 
                override={override} 
            />;
        });
    } else {
        const { static: staticValue, dynamic, dynamicValueOnly } = calculateValue(props.ratio, status, config, props.skill == "other" ? "other" : {skill: props.skill, level: skillLevel ?? 0}, props.multiplier);
        const resultClass = typeof props.overrideExpression === "object" ? props.overrideExpression.result?.className : undefined;
        return (
            <>
                {dynamicValueOnly ? null : <span className={resultClass ?? style.emphasis}>{staticValue.toString()}</span>}
                {
                    dynamic ?
                    Object.entries(dynamic).map(([key, value], index) => {
                        const override = typeof props.overrideExpression === "object" ? props.overrideExpression?.[key as keyof ValueRatio] : undefined
                        return <ValueExpression key={key} id={key as keyof ValueRatio} level={skillLevel} ratio={value.toNumber()} brackets={index != 0 || !dynamicValueOnly} override={override} />
                    })
                    : null
                }
            </>
        )
    }
};

export default value;