import * as React from "react";
import { useValueContext } from "./value-context";
import { calculateValue } from "app-types/value-ratio/calculation";
import { ValueRatio } from "app-types/value-ratio";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import style from "./tooltip.module.styl";
import ValueExpression from "./value-expression";

type Props = {
    ratio: ValueRatio
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "item"
    multiplier?: number
    overrideExpression?: {[K in keyof ValueRatio]: {format?: string, className?: string}}
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
            const override = props.overrideExpression?.[key as keyof ValueRatio];
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
                    Object.entries(dynamic).map(([key, value], index) => (
                        <ValueExpression key={key} id={key as keyof ValueRatio} level={skillLevel} ratio={value.toNumber()} brackets={index != 0 || !dynamicValueOnly} />
                    ))
                    : null
                }
            </>
        )
    }
};

export default value;