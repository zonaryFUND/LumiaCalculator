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
            if (typeof value === "number") {
                return <ValueExpression key={key} id={key as keyof ValueRatio} ratio={value} brackets={index != 0} />;
            } else if (Array.isArray(value)) {
                return <ValueExpression key={key} id={key as keyof ValueRatio} ratio={value[skillLevel ?? 0]} brackets={index != 0} />;
            } else {
                return null;
            }
        });
    } else {
        const damage = calculateValue(props.ratio, context.status, context.config, props.skill == "item" ? "item" : {skill: props.skill, level: skillLevel ?? 0}).percent(props.multiplier ?? 100);
        return <span className={style.emphasis}>{damage.toString()}</span>
    }
};

export default value;