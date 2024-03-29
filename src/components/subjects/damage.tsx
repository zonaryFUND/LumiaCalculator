import * as React from "react";
import skillDamage from "./skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "./props";

type Value = number | number[]

type Props = SubjectSkillProps & {
    skill: "Q" | "W" | "E" | "R" | "T"
    constants: {
        base: Value,
        attack?: Value,
        additionalAttack?: Value,
        additionalMaxHP?: Value
        amp?: Value
        targetHP?: Value
    }
}

function current(skillLevel: number, value: Value): number {
    if (Array.isArray(value)) {
        return value[skillLevel]
    } else {
        return value
    }
}

const damage: React.FC<Props> = props => {
    const skillLevel = props.config.skillLevels[props.skill];
    if (props.showEquation) {
        return (
            <>
                {
                    Object.keys(props.constants).map(key => {
                        const value = (props.constants as any)[key];
                        if (value == undefined) return null;
                        switch (key) {
                            case "base":
                                return <span key={key} className={style.emphasis}>{current(skillLevel, props.constants.base!)}</span>;
                            case "attack":
                                return <span key={key} className={style.attack}>(+攻撃力の{current(skillLevel, props.constants.attack!)}％)</span>;
                            case "additionalAttack":
                                return <span key={key} className={style.attack}>(+追加攻撃力の{current(skillLevel, props.constants.additionalAttack!)}％)</span>;
                            case "additionalMaxHP":
                                return <span key={key} className={style.maxhp}>(+追加体力の{current(skillLevel, props.constants.additionalMaxHP!)}％)</span>;                                
                            case "amp":
                                return <span key={key} className={style.amp}>(+スキル増幅の{current(skillLevel, props.constants.amp!)}％)</span>;
                            case "targetHP":
                                return <span key={key} className={style.maxhp}>(+対象の現在体力の{current(skillLevel, props.constants.targetHP!)}％)</span>;
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
               <span className={style.emphasis}>{skillDamage(props.status, skillLevel, props.constants).toString()}</span>
               {props.constants.targetHP ? <span className={style.maxhp}>(+対象の現在体力の{current(skillLevel, props.constants.targetHP)}％)</span> : null}
            </>
        );
    }
}

export default damage;