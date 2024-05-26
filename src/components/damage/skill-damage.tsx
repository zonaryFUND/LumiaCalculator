import * as React from "react";
import damage, { skillLevel } from "components/subjects/skill-damage";
import style from "./damage-table.module.styl";
import { useToggle } from "react-use";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import { SkillValueProps } from "components/subjects/damage-table";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Source, ValueRatio, isValueRatio } from "app-types/value-ratio";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";
import { calculateValue } from "app-types/value-ratio/calculation";

type Props = SkillValueProps & {
    config: SubjectConfig
    status: Status
    summonedName?: string
}

function levelValue(from: number | number[], level: number): number {
    if (Array.isArray(from)) {
        return from[level];
    } else {
        return from;
    }
}

function equation(value: ValueRatio, status: Status, level: number, skillLevel: number, stack: number, summonedName?: string): React.ReactElement {
    const elem = (Object.entries(value) as [string, number | number][]).reduce((prev, [key, value]) => {
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
                return p.concat(<><span className={table.small}><FormattedMessage id="status.attack-power" /></span>{status.attackPower.calculatedValue.toString()} x {levelValue(value, skillLevel)}％</>);
            case "additionalAttack":
                return p.concat(<><span className={table.small}>追加攻撃力</span>{status.attackPower.additional?.toString()} x {levelValue(value, skillLevel)}％</>);
            case "additionalMaxHP":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.additional-maxhp" /></span>{status.maxHP.additional?.toString()} x {levelValue(value, skillLevel)}％</>);
            case "maxHP":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.maxhp" /></span>{status.maxHP.calculatedValue.toString()} x {levelValue(value, skillLevel)}％</>);
            case "defense":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.defense" /></span>{status.defense.calculatedValue.toString()} x {levelValue(value, skillLevel)}％</>);
            case "amp":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.skill-amp" /></span>{status.skillAmp.calculatedValue.toString()} x {levelValue(value, skillLevel)}％</>);
            case "level":
                return p.concat(<><span className={table.small}>レベル</span>{level} x {levelValue(value, skillLevel)}</>);
            case "basicAttackAmp":
                return p.concat(<> x (<span className={table.small}>基本攻撃増幅</span>{status.basicAttackAmp.calculatedValue.toString()}％ + 1)</>);
            case "criticalChance":
                return p.concat(<> x (<span className={table.small}>致命打確率</span>{status.criticalChance.toString()}％ x {levelValue(value, skillLevel)})</>)
            case "summoned_attack":
                return p.concat(<><span className={table.small}>{summonedName}攻撃力</span>{status.summonedStatus?.attackPower.toString()} x {levelValue(value, skillLevel)}％</>);
            case "stack":
                return p.concat(<><span className={table.small}>スタック</span>{stack} x {levelValue(value, skillLevel)}</>);
            case "additionalAttackSpeed":
                return p.concat(<><span className={table.small}>追加攻撃速度(％)</span>{status.attackSpeed.additional?.toString()} x {levelValue(value, skillLevel)}％</>);
            case "max":
                return p.concat(<>最大値{levelValue(value, skillLevel)})</>);
        }
        return prev;
    }, [] as React.ReactElement[]);
    return elem.length > 0 ? <>{elem} = </> : <></>
}

const skillDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    if (!isValueRatio(props.value)) return null;

    const level = props.skill == "item" ? 0 : skillLevel(props.skill, props.config);
    const {static: staticValue, dynamic, dynamicValueOnly} = (() => {
        if (isValueRatio(props.value)) {
            const source: Source = props.skill == "item" ? "item" : {skill: props.skill, level: skillLevel(props.skill, props.config)};
            return calculateValue(props.value, props.status, props.config, source);
        } else {
            return {static: new Decimal(0), dynamic: undefined, dynamicValueOnly: false};
        }
    })();

    const percent = React.useMemo(() => {
        return props.type == "ms" || props.type =="ratio" ? "%" : null
    }, [props.type])

    const [value, expandDescriptionStatic] = (() => {
        if (props.multiplier) {
            const [equation, multiplier] = props.multiplier.reduce((prev, multiplier: any) => {
                if (multiplier.basic) {
                    const value = Array.isArray(multiplier.basic) ? multiplier.basic[level] : multiplier.basic;
                    return [
                        <>{prev[0]} x {value}%</>,
                        prev[1] * value / 100
                    ]
                } else {
                    const value = Array.isArray(multiplier.value) ? multiplier.value[level] : multiplier.value;
                    return [
                        <>{prev[0]} x <span className={table.small}>{multiplier.name}</span>{value}%</>,
                        prev[1] * value / 100
                    ]
                }
            }, [<>{staticValue.toString()}</>, 100]);
            const value = staticValue.percent(multiplier);
            return [
                value,
                <tr><td colSpan={4}>{equation} = {value.toString()}</td></tr>
            ]
        }

        const baseEquation = <>{equation(props.value, props.status, props.config.level, level, props.config.stack, props.summonedName)}{staticValue.toString()}{percent}</>;
        return [
            dynamicValueOnly ? null : staticValue,
            dynamic ? 
                dynamicValueOnly ? null :
                <tr><td><FormattedMessage id="app.static-value" /></td><td>{baseEquation}</td></tr> 
            : <tr><td colSpan={2}>{baseEquation}</td></tr>
        ]
    })();

    const [dynamicValue, expandDescriptionsDynamic] = (() => {
        if (dynamic == undefined) return [null, null];
        if (!isValueRatio(props.value)) return [null, null];

        return Object.entries(dynamic).reduce((prev, [key, value], index) => {
            const [content, label] = (() => {
                switch (key) {
                    case "targetHP":
                    case "targetLostHP":
                        return [
                            <FormattedMessage id="app.value.target-lost-hp" values={{ratio: value.toString()}} />,
                            <FormattedMessage id="app.label.target-lost-hp" />
                        ]
                    case "lostHP":
                        return [
                            <FormattedMessage id="app.value.lost-hp" values={{ratio: value.toString()}} />,
                            <FormattedMessage id="app.label.lost-hp" />
                        ]
                    case "targetMaxHP":
                        return [
                            <FormattedMessage id="app.value.target-maxhp" values={{ratio: value.toString()}} />,
                            <FormattedMessage id="app.label.target-maxhp" />
                        ]
                    default:
                        return [null, null]
                }
            })();
            const bracket = index > 0 || !dynamicValueOnly;
            const ratio = props.value[key as keyof ValueRatio];
            const isCalculated = typeof ratio === "object" && !Array.isArray(ratio);

            return [
                (
                    <>
                        {prev[0]}
                        {bracket ? <>(+</> : null}
                        {content}
                        {bracket ? <>)</> : null}
                    </>
                ),
                isCalculated ? prev[1].concat(
                    <tr>
                        <td>{label}</td>
                        <td>{equation(ratio, props.status, props.config.level, level, props.config.stack)}{value.toString()}</td>
                    </tr>
                ) : prev[1]
            ];
        }, [<></>, [] as React.ReactNode[]]);
    })();

        /*
    const [additional, expandDescription, objectAdditional] = (() => {
        const additionalKeys = [
            {key: "targetMaxHP", text: "対象の最大体力の", ratio: "対象最大体力比"},
            {key: "targetLostHP", text: "対象の失った体力の", ratio: "対象消耗体力比"},
            {key: "lostHP", text: "失った体力の", ratio: "消耗体力比"},
            {key: "targetHP", text: "対象の現在体力の", ratio: "対象体力比"},
            {key: "lostHPPercent", text: "失った体力1％あたり", ratio: "消耗体力比", removePercent: true}, // sissela only for now
            {key: "gauge", text: "消耗ゲージの", ratio: "消耗ゲージ比"}
        ]
        //const tuple = additionalKeys.find(k => props.value[k.key as keyof ValueRatio] != undefined);
        const tuple = undefined;
        if (tuple == undefined) {
            return [null, <td colSpan={4}>{baseDamageTr}</td>]
        }

        //const brackets = !value.isZero()
        if (typeof props.value[tuple.key as keyof ValueRatio] === "object") {
            const ratio = Array.isArray(props.value[tuple.key as keyof ValueRatio]) ?
                new Decimal((props.value[tuple.key as keyof ValueRatio] as number[])[level]) :
                damage(props.status, props.config, props.skill, props.value[tuple.key as keyof ValueRatio]);
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
                                    <>{equation(props.value[tuple.key as keyof ValueRatio], props.status, props.config.level, level, props.config.stack, props.summonedName)}{ratio.toString()}</>
                                }{tuple.removePercent ? null : "％"}
                            </td>
                        </tr>
                    </InnerTable>
                </td>,
                true
            ]
        } else {
            const content = <>{tuple.text}{new Decimal(levelValue(props.value[tuple.key as keyof ValueRatio] as any, level)).percent(multiplier ?? 100).toString()}％</>;
            return [
                brackets ? <span>+({content})</span> : <span>{content}</span>,
                <td colSpan={4}>{baseDamageTr}</td>,
                false
            ]
        }
        //const content = <>{tuple.text}{new Decimal(levelValue(props.value[tuple.key as keyof ValueRatio] as any, level)).percent(multiplier ?? 100).toString()}％</>;
        const content = null;
        return [
            brackets ? <span>+({content})</span> : <span>{content}</span>,
            <td colSpan={4}>{baseDamageTr}</td>,
            false
        ]
    })();
    */

    /*
    const kenneth = (() => {
        //if (props.type != "kenneth") return null;
        return "％";
    })();
    */

    const valueClass = (() => {
        /*
        if (props.type == "kenneth" && props.skill == "T") {
            return style.heal;
        }
        */
        return props.type ? style[props.type] : style.skill;
    })();

    const prohibitToggle = value?.isZero() != false &&
        (expandDescriptionsDynamic ?? []).length == 0

    return (
        <>
            <tr onClick={prohibitToggle ? undefined : toggleExpand}>
                <td>{props.label}</td>
                <td colSpan={3} className={valueClass}>{value?.isZero() && false ? null : value?.floor().toString()}{dynamicValue}{/*kenneth}{additional*/}{percent}</td>
            </tr>
            <tr className={table.expand} style={!expand ? {display: "none"} : undefined}><td colSpan={4}>
                <InnerTable>
                    {expandDescriptionStatic}
                    {expandDescriptionsDynamic}
                </InnerTable>
            </td></tr>
        </>
    )
}

export default skillDamage;