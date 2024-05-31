import * as React from "react";
import { useValueContext } from "./value-context";
import { calculateValue } from "app-types/value-ratio/calculation";
import { ValueElement, ValueRatio } from "app-types/value-ratio";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import style from "./tooltip.module.styl";
import ValueExpression from "./value-expression";

type Props = {
    ratio: ValueRatio
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "item"
    multiplier?: number
    overrideExpression?: {[K in keyof ValueRatio]: {format?: string, className?: string}} |
        ((key: keyof ValueRatio) => (value: number | React.ReactNode) => React.ReactNode | undefined)
}

const value: React.FC<Props> = props => {
    const context = useValueContext();
    const skillLevel = React.useMemo(() => {
        if (props.skill == "item") return undefined;
        if (props.skill == "D") return weaponSkillLevel(context.config.weaponMastery);
        return context.config.skillLevels[props.skill];
    }, [props.skill, context.config.weaponMastery, context.config.skillLevels]);

    if (context.showEquation) {
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
        const { static: staticValue, dynamic, dynamicValueOnly } = calculateValue(props.ratio, context.status, context.config, props.skill == "item" ? "item" : {skill: props.skill, level: skillLevel ?? 0}, props.multiplier);
        
        return (
            <>
                {dynamicValueOnly ? null : <span className={style.emphasis}>{staticValue.toString()}</span>}
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