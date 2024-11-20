import * as React from "react";
import Decimal from "decimal.js";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";
import style from "components/tooltip/tooltip.module.styl";
import { UniqueValueStrategy } from "../unique-value-strategy";

type Ratio = {
    base: number | number[]
    ninaAttack: number | number[]
}

export function NinaRatioStrategy(skill: "Q" | "W" | "E" | "R" | "T", ratio: Ratio): UniqueValueStrategy {
    return  (config, status) => {
        const level = config.skillLevels[skill];
        const base = Array.isArray(ratio.base) ? ratio.base[level] : ratio.base;
        const ninaAttack = Array.isArray(ratio.ninaAttack) ? ratio.ninaAttack[level] : ratio.ninaAttack;
        const value = new Decimal(base).add(status.summoned![0].status.attackPower.percent(ninaAttack)).floor();

        return {
            value,
            equationExpression: [
                {
                    expression: [
                        `${base} + `,
                        { intlID: "subject.chloe.nina-attack" },
                        `${status.summoned![0].status.attackPower.toString()} x ${ninaAttack}% = ${value}`
                    ]
                }
            ]
        }
    }
}

export const NinaValue: React.FC<SubjectSkillProps & Ratio> = props => {
    const { status, showEquation } = useValueContext();
    const base = Array.isArray(props.base) ? props.base[props.skillLevel] : props.base;
    const attack = Array.isArray(props.ninaAttack) ? props.ninaAttack[props.skillLevel] : props.ninaAttack;

    if (showEquation) {
        return <>
            <span className={style.emphasis}>{base}</span>
            <span className={style.attack}>(+ニナの攻撃力の{attack}%)</span>
        </>
    } else {
        return <span className={style.emphasis}>{new Decimal(base).add(status.summoned![0].status.attackPower.percent(attack)).floor().toString()}</span>
    }
}
