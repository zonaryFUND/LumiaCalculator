import { Status } from "components/subject/status";
import * as React from "react";
import { SubjectConfig } from "components/subject/use-subject-config";
import damage, { skillLevel } from "components/subjects/skill-damage";
import style from "./damage-table.module.styl";
import { useToggle } from "react-use";
import table from "components/common/table.styl";

type Props = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D"
    config: SubjectConfig
    status: Status
    damage: any
    multiplier?: number[] | number
    type?: "heal"
}

function levelValue(from: number | number[], level: number): number {
    if (Array.isArray(from)) {
        return from[level];
    } else {
        return from;
    }
}

function equation(damage: any, status: Status, level: number): React.ReactElement[] {
    return (Object.entries(damage) as [string, number | number][]).reduce((prev, [key, value]) => {
        const p = prev.length == 0 ? prev : prev.concat(<> + </>)
        switch (key) {
            case "base":
                return p.concat(<>{levelValue(value, level)}</>);
            case "attack":
                return p.concat(<><span>攻撃力</span>{status.attackPower.toString()} x {levelValue(value, level)}％</>);
            case "additionalMaxHP":
                return p.concat(<><span>追加体力</span>{status.additionalMaxHP.toString()} x {levelValue(value, level)}％</>);
            case "maxHP":
                return p.concat(<><span>最大体力</span>{status.maxHP.toString()} x {levelValue(value, level)}％</>);
        }
        return prev;
    }, [] as React.ReactElement[]);
}

const skillDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const level = skillLevel(props.skill, props.config);
    const [value, base, multiplier] = (() => {
        const base = damage(props.status, props.config, props.skill, props.damage);
        if (props.multiplier) {
            const mul = Array.isArray(props.multiplier) ? props.multiplier[level] : props.multiplier;   
            return [base.percent(mul), base, mul];
        }

        return [base];
    })();

    const additional = (() => {
        if (props.damage.targetMaxHP == undefined) return null;
        const brackets = !value.isZero()
        const content = <>対象の最大体力の{levelValue(props.damage.targetMaxHP, level)}％</>
        return brackets ? <span>+({content})</span> : <span>{content}</span>
    })();

    return (
        <>
            <tr onClick={value.isZero() ? undefined : toggleExpand}>
                <td colSpan={3}>{props.label}</td>
                <td className={props.type == "heal" ? style.heal : style.skill}>{value.isZero() ? null : value.toString()}{additional}</td>
            </tr>
            {
                expand ?
                <tr className={table.expand}>
                    {
                        base ?
                        <td colSpan={4}>{base.toString()} x {multiplier}％ = {value.toString()}</td> :
                        <td colSpan={4}>{equation(props.damage, props.status, level)} = {value.toString()}</td>
                    }
                </tr> 
                : null
            }
        </>
    )
}

export default skillDamage;