import * as React from "react";
import skillDamage from "./skill-damage";
import { StatusContext } from "components/subject/subject-context";
import style from "components/tooltip/tooltip.module.styl";

export const FormulaContext = React.createContext(false);

type Value = number | number[]

type Props = {
    skill: "Q" | "W" | "E" | "R" | "T"
    constants: {
        base: Value,
        attack?: Value,
        additionalAttack?: Value,
        additionalMaxHP?: Value
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
    const status = React.useContext(StatusContext)!;
    const formula = React.useContext(FormulaContext);
    const skillLevel = status.skillLevels[props.skill]

    if (formula) {
        return (
            <>
                <span className={style.emphasis}>{current(skillLevel, props.constants.base)}</span>
                {props.constants.attack ? <span className={style.attack}>(+攻撃力の{current(skillLevel, props.constants.attack)}％)</span> : null}
                {props.constants.additionalAttack ? <span className={style.attack}>(+追加攻撃力の{current(skillLevel, props.constants.additionalAttack)}％)</span> : null}
                {props.constants.additionalMaxHP ? <span className={style.maxhp}>(+追加体力の{current(skillLevel, props.constants.additionalMaxHP)}％)</span> : null}
            </>
        );
    } else {
        return <span className={style.emphasis}>{skillDamage(status, skillLevel, props.constants).toString()}</span>
    }
}

export default damage;