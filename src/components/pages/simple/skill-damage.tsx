import { Status } from "components/subject/status";
import * as React from "react";
import { SubjectConfig } from "components/subject/use-subject-config";
import damage, { skillLevel } from "components/subjects/skill-damage";
import style from "./damage-table.module.styl";
import { useToggle } from "react-use";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";

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
            case "additionalAttack":
                return p.concat(<><span>追加攻撃力</span>{status.additionalAttackPower.toString()} x {levelValue(value, level)}％</>);
            case "additionalMaxHP":
                return p.concat(<><span>追加体力</span>{status.additionalMaxHP.toString()} x {levelValue(value, level)}％</>);
            case "maxHP":
                return p.concat(<><span>最大体力</span>{status.maxHP.toString()} x {levelValue(value, level)}％</>);
            case "amp":
                return p.concat(<><span>スキル増幅</span>{status.skillAmp.toString()} x {levelValue(value, level)}％</>);
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

    const baseDamageTr =  base ?
        <>{base.toString()} x {multiplier}％ = {value.toString()}</> :
        <>{equation(props.damage, props.status, level)} = {value.toString()}</>;

    const [additional, expandDescription] = (() => {
        const additionalKeys = [
            {key: "targetMaxHP", text: "対象の最大体力の", ratio: "対象最大体力比"},
            {key: "targetLostHP", text: "対象の失った体力の", ratio: "対象消耗体力比"},
            {key: "targetHP", text: "対象の現在体力の", ratio: "対象体力比"}
        ]
        const tuple = additionalKeys.find(k => props.damage[k.key] != undefined);
        if (tuple == undefined) {
            return [null, <td colSpan={4}>{baseDamageTr}</td>]
        }

        const brackets = !value.isZero()
        if (typeof props.damage[tuple.key] === "object") {
            const ratio = damage(props.status, props.config, props.skill, props.damage[tuple.key]);
            const multiplied = ratio.percent(multiplier ?? 100);
            const content = <>{tuple.text}{multiplied.toString()}％</>
            return [
                brackets ? <span>+({content})</span> : <span>{content}</span>,
                <td colSpan={4}>
                    <InnerTable>
                        <tr><td>基礎値</td><td>{baseDamageTr}</td></tr>
                        <tr>
                            <td>{tuple.ratio}</td>
                            <td>
                                {
                                    multiplier ? 
                                    <>{ratio.toString()} x {multiplier}％ = {multiplied.toString()}</> :
                                    <>{equation(props.damage[tuple.key], props.status, level)} = {ratio.toString()}</>
                                }％
                            </td>
                        </tr>
                    </InnerTable>
                </td>
            ]
        } else {
            const content = <>{tuple.text}{levelValue(props.damage[tuple.key], level)}％</>;
            return [
                brackets ? <span>+({content})</span> : <span>{content}</span>,
                <td colSpan={4}>{baseDamageTr}</td>
            ]
        }
    })();

    return (
        <>
            <tr onClick={value.isZero() ? undefined : toggleExpand}>
                <td colSpan={3}>{props.label}</td>
                <td className={props.type == "heal" ? style.heal : style.skill}>{value.isZero() ? null : value.toString()}{additional}</td>
            </tr>
            { expand ? <tr className={table.expand}>{expandDescription}</tr> : null }
        </>
    )
}

export default skillDamage;