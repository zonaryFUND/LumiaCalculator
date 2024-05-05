import { Status } from "components/subject/status";
import * as React from "react";
import { SubjectConfig } from "components/subject/use-subject-config";
import damage, { skillLevel } from "components/subjects/skill-damage";
import style from "./damage-table.module.styl";
import { useToggle } from "react-use";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import { SkillDamageProps } from "components/subjects/damage-table";
import Decimal from "decimal.js";

type Props = SkillDamageProps & {
    config: SubjectConfig
    status: Status
    summonedName: string
}

function levelValue(from: number | number[], level: number): number {
    if (Array.isArray(from)) {
        return from[level];
    } else {
        return from;
    }
}

function equation(damage: any, status: Status, level: number, skillLevel: number, stack: number, summonedName?: string): React.ReactElement {
    const elem = (Object.entries(damage) as [string, number | number][]).reduce((prev, [key, value]) => {
        const p = (() => {
            if (key == "criticalChance") {
                return [<>({prev})</>];
            }
            if (key == "max") {
                return [<>({prev}, </>];
            }
            if (prev.length > 0 && key != "basicAttackAmp") {
                return prev.concat(<> + </>);
            }
            return prev;
        })();
        
        switch (key) {
            case "base":
                return p.concat(<>{levelValue(value, skillLevel)}</>);
            case "attack":
                return p.concat(<><span>攻撃力</span>{status.attackPower.toString()} x {levelValue(value, skillLevel)}％</>);
            case "additionalAttack":
                return p.concat(<><span>追加攻撃力</span>{status.additionalAttackPower.toString()} x {levelValue(value, skillLevel)}％</>);
            case "additionalMaxHP":
                return p.concat(<><span>追加体力</span>{status.additionalMaxHP.toString()} x {levelValue(value, skillLevel)}％</>);
            case "maxHP":
                return p.concat(<><span>最大体力</span>{status.maxHP.toString()} x {levelValue(value, skillLevel)}％</>);
            case "defense":
                return p.concat(<><span>防御力</span>{status.defense.toString()} x {levelValue(value, skillLevel)}％</>);
            case "amp":
                return p.concat(<><span>スキル増幅</span>{status.skillAmp.toString()} x {levelValue(value, skillLevel)}％</>);
            case "perLevel":
                return p.concat(<><span>レベル</span>{level} x {levelValue(value, skillLevel)}</>);
            case "basicAttackAmp":
                return p.concat(<> x (<span>基本攻撃増幅</span>{status.basicAttackAmp.toString()}％ + 1)</>);
            case "criticalChance":
                return p.concat(<> x (<span>致命打確率</span>{status.criticalChance.toString()}％ x {levelValue(value, skillLevel)})</>)
            case "summoned_attack":
                return p.concat(<><span>{summonedName}攻撃力</span>{status.summonedStatus?.attackPower.toString()} x {levelValue(value, skillLevel)}％</>);
            case "stack":
                return p.concat(<><span>スタック</span>{stack} x {levelValue(value, skillLevel)}</>);
            case "additionalAttackSpeed":
                return p.concat(<><span>追加攻撃速度(％)</span>{status.attackSpeed.multiplier.toString()} x {levelValue(value, skillLevel)}％</>);
            case "max":
                return p.concat(<>最大値{levelValue(value, skillLevel)})</>);
        }
        return prev;
    }, [] as React.ReactElement[]);
    return elem.length > 0 ? <>{elem} = </> : <></>
}

const skillDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const level = skillLevel(props.skill, props.config);
    const [value, base, multiplier, sidewinder] = (() => {
        const base = damage(props.status, props.config, props.skill, props.damage);
        if (props.multiplier != undefined || props.sidewinder) {
            const mul = Array.isArray(props.multiplier) ? props.multiplier[level] : props.multiplier;
            return [base.percent(mul ?? 100).addPercent(props.sidewinder ?? 0), base, mul, props.sidewinder];
        }

        return [base];
    })();

    const percent = React.useMemo(() => {
        return props.type == "ms" ? "％" : null
    }, [props.type])

    const baseDamageTr =  base ?
        <>{base.toString()} x {multiplier}％{sidewinder ? <><span> x (サイドワインダー増幅</span>{sidewinder}％ + 1)</> : null} = {value.toString()}{percent}</> :
        <>{equation(props.damage, props.status, props.config.level, level, props.config.stack, props.summonedName)}{value.toString()}{percent}</>;

    const [additional, expandDescription, objectAdditional] = (() => {
        const additionalKeys = [
            {key: "targetMaxHP", text: "対象の最大体力の", ratio: "対象最大体力比"},
            {key: "targetLostHP", text: "対象の失った体力の", ratio: "対象消耗体力比"},
            {key: "lostHP", text: "失った体力の", ratio: "消耗体力比"},
            {key: "targetHP", text: "対象の現在体力の", ratio: "対象体力比"},
            {key: "lostHPPercent", text: "失った体力1％あたり", ratio: "消耗体力比", removePercent: true}, // sissela only for now
            {key: "gauge", text: "消耗ゲージの", ratio: "消耗ゲージ比"}
        ]
        const tuple = additionalKeys.find(k => props.damage[k.key] != undefined);
        if (tuple == undefined) {
            return [null, <td colSpan={4}>{baseDamageTr}</td>]
        }

        const brackets = !value.isZero()
        if (typeof props.damage[tuple.key] === "object") {
            const ratio = Array.isArray(props.damage[tuple.key]) ?
                new Decimal(props.damage[tuple.key][level]) :
                damage(props.status, props.config, props.skill, props.damage[tuple.key]);
            const multiplied = ratio.percent(multiplier ?? 100);
            const content = <>{tuple.text}{multiplied.toString()}{tuple.removePercent ? null : "％"}</>
            return [
                brackets ? <span>+({content})</span> : <span>{content}</span>,
                <td colSpan={4}>
                    <InnerTable>
                        {value.isZero() ? null : <tr><td>基礎値</td><td>{baseDamageTr}</td></tr>}
                        <tr>
                            <td>{tuple.ratio}</td>
                            <td>
                                {
                                    multiplier ? 
                                    <>{ratio.toString()} x {multiplier}％ {} = {multiplied.toString()}</> :
                                    <>{equation(props.damage[tuple.key], props.status, props.config.level, level, props.config.stack, props.summonedName)}{ratio.toString()}</>
                                }{tuple.removePercent ? null : "％"}
                            </td>
                        </tr>
                    </InnerTable>
                </td>,
                true
            ]
        } else {
            const content = <>{tuple.text}{new Decimal(levelValue(props.damage[tuple.key], level)).percent(multiplier ?? 100).toString()}％</>;
            return [
                brackets ? <span>+({content})</span> : <span>{content}</span>,
                <td colSpan={4}>{baseDamageTr}</td>,
                false
            ]
        }
    })();

    const kenneth = (() => {
        if (props.type != "kenneth") return null;
        return "％";
    })();

    const valueClass = (() => {
        if (props.type == "kenneth" && props.skill == "T") {
            return style.heal;
        }
        return props.type ? style[props.type] : style.skill;
    })();

    return (
        <>
            <tr onClick={value.isZero() && !objectAdditional ? undefined : toggleExpand}>
                <td colSpan={3}>{props.label}</td>
                <td className={valueClass}>{value.isZero() && additional ? null : value.floor().toString()}{kenneth}{additional}{percent}</td>
            </tr>
            { expand ? <tr className={table.expand}>{expandDescription}</tr> : null }
        </>
    )
}

export default skillDamage;