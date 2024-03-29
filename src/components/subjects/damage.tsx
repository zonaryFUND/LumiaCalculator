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
                <span className={style.emphasis}>{current(skillLevel, props.constants.base)}</span>
                {props.constants.attack ? <span className={style.attack}>(+攻撃力の{current(skillLevel, props.constants.attack)}％)</span> : null}
                {props.constants.additionalAttack ? <span className={style.attack}>(+追加攻撃力の{current(skillLevel, props.constants.additionalAttack)}％)</span> : null}
                {props.constants.additionalMaxHP ? <span className={style.maxhp}>(+追加体力の{current(skillLevel, props.constants.additionalMaxHP)}％)</span> : null}
                {props.constants.amp ? <span className={style.amp}>(+スキル増幅の{current(skillLevel, props.constants.amp)}％)</span> : null}
                {props.constants.targetHP ? <span className={style.maxhp}>(+対象の現在体力の{current(skillLevel, props.constants.targetHP)}％)</span> : null}
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