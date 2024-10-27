import * as React from "react";
import style from "../damage-table.module.styl";
import { useToggle } from "react-use";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import { SkillValueProps } from "components/subjects/damage-table";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Source, ValueRatio, isValueRatio } from "app-types/value-ratio";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage, useIntl } from "react-intl";
import { calculateValue } from "app-types/value-ratio/calculation";
import { SummonedStatus } from "components/subjects/summoned-status";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import { extractMultiplier, extractskillLevel } from "../damage-table-util";

type Props = SkillValueProps & {
    config: SubjectConfig
    status: Status
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
                return p.concat(<><span className={table.small}><FormattedMessage id="status.attack-power" /></span>{status.attackPower.calculatedValue.toString()} x {levelValue(value, skillLevel)}%</>);
            case "additionalAttack":
                return p.concat(<><span className={table.small}>追加攻撃力</span>{status.attackPower.additional?.toString()} x {levelValue(value, skillLevel)}%</>);
            case "additionalMaxHP":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.additional-maxhp" /></span>{status.maxHP.additional?.toString()} x {levelValue(value, skillLevel)}%</>);
            case "maxHP":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.maxhp" /></span>{status.maxHP.calculatedValue.toString()} x {levelValue(value, skillLevel)}%</>);
            case "defense":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.defense" /></span>{status.defense.calculatedValue.toString()} x {levelValue(value, skillLevel)}%</>);
            case "amp":
                return p.concat(<><span className={table.small}><FormattedMessage id="status.skill-amp" /></span>{status.skillAmp.calculatedValue.toString()} x {levelValue(value, skillLevel)}%</>);
            case "level":
                return p.concat(<><span className={table.small}>レベル</span>{level} x {levelValue(value, skillLevel)}</>);
            case "basicAttackAmp":
                return p.concat(<> x (<span className={table.small}>基本攻撃増幅</span>{status.basicAttackAmp.calculatedValue.toString()}% + 1)</>);
            case "criticalChance":
                return p.concat(<> x (<span className={table.small}>致命打確率</span>{status.criticalChance.toString()}% x {levelValue(value, skillLevel)})</>)
            case "summonedAttack":
                return p.concat(<><span className={table.small}>{summonedName}攻撃力</span>{status.summonedStatus?.attackPower.toString()} x {levelValue(value, skillLevel)}%</>);
            case "stack":
                return p.concat(<><span className={table.small}>スタック</span>{stack} x {levelValue(value, skillLevel)}</>);
            case "additionalAttackSpeed":
                return p.concat(<><span className={table.small}>追加攻撃速度(%)</span>{status.attackSpeed.additional?.toString()} x {levelValue(value, skillLevel)}%</>);
            case "max":
                return p.concat(<>最大値{levelValue(value, skillLevel)})</>);
        }
        return prev;
    }, [] as React.ReactElement[]);
    return elem.length > 0 ? <>{elem} = </> : <></>
}

const skillDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const intl = useIntl();
    const summonedName = React.useMemo(() => {
        const module = SummonedStatus[props.config.subject];
        if (module == undefined) return undefined;
        return intl.formatMessage({id: module.nameKey});
    }, [props.config.subject]);

    if (!isValueRatio(props.value)) return null;

    const level = extractskillLevel(props, props.config);
    const {static: staticValue, dynamic, dynamicValueOnly} = (() => {
        if (isValueRatio(props.value)) {
            const source: Source = (() => {
                if (props.skill == "other") return "other";
                if ((props.skill as any).tacticalLevel != undefined) return {skill: "tactical", level};
                return {skill: props.skill, level} as Source;
            })();
            return calculateValue(props.value, props.status, props.config, source);
        } else {
            return {static: new Decimal(0), dynamic: undefined, dynamicValueOnly: false};
        }
    })();

    const multiplier = extractMultiplier(level, props.multiplier);

    const percent = React.useMemo(() => props.type?.type == "misc" && props.type?.percentExpression, [props.type]);

    const healPower = (props.type?.type == "heal") && props.status.healPower.calculatedValue.greaterThan(0) ?
            props.status.healPower.calculatedValue : null;

    const [value, expandDescriptionStatic] = (() => {
        if (dynamicValueOnly) return [null, null];        

        if (multiplier) {
            const value = staticValue.percent(multiplier[0]);
            const equation = multiplier[1].reduce((prev, def) => {
                if (def.label) {
                    return <>{prev} x <span className={table.small}>{def.label}</span>{value}%</>
                } else {
                    return <>{prev} x {def}</>
                }
            }, <>{staticValue.toString()}</>)

            return [
                value.addPercent(healPower || 0),
                <>
                    <tr>
                        {dynamic ? <td><FormattedMessage id="app.static-value" /></td> : null}
                        <td colSpan={dynamic ? undefined : 2}>{equation} = {value.toString()}</td>
                    </tr>
                    {healPower ? <tr><td><FormattedMessage id="status.heal-power" /></td><td>{value.toString()} x {healPower.toString()}% = {value.percent(healPower).toString()}</td></tr> : null}
                </>
            ]
        } else {
            const baseEquation = <>{equation(props.value, props.status, props.config.level, level, props.config.stack, summonedName)}{staticValue.toString()}{percent}</>;
            return [
                staticValue.addPercent(healPower || 0),
                <>
                    <tr>
                        {dynamic ? <td><FormattedMessage id="app.static-value" /></td> : null}
                        <td colSpan={dynamic ? undefined : 2}>{baseEquation}</td>
                    </tr>
                    {healPower ? <tr><td><FormattedMessage id="status.heal-power" /></td><td>{staticValue.toString()} x {healPower.toString()}% = {staticValue.percent(healPower).toString()}</td></tr> : null}
                </>
            ]
        }
    })();

    const [dynamicValue, expandDescriptionsDynamic] = (() => {
        if (dynamic == undefined) return [null, null];
        if (!isValueRatio(props.value)) return [null, null];

        return Object.entries(dynamic).reduce((prev, [key, value], index) => {
            const bracket = index > 0 || !dynamicValueOnly;
            const ratio = props.value[key as keyof ValueRatio];
            const [dynamicEquation, multipliedValue] = (() => {
                const isCalculated = typeof ratio === "object" && !Array.isArray(ratio);
                if (!isCalculated && !props.multiplier) return [null, value];

                if (multiplier) {
                    const multiplied = value.percent(multiplier[0])
                    const equation = multiplier[1].reduce((prev, def) => {
                        if (def.label) {
                            return <>{prev} x <span className={table.small}>{def.label}</span>{value}%</>
                        } else {
                            return <>{prev} x {def}</>
                        }
                    }, <>{staticValue.toString()}</>)
                    return [
                        <td>{equation} = {multiplied.toString()}</td>,
                        multiplied.addPercent(healPower || 0)
                    ]
                } else {
                    return [
                        <td>{equation(ratio as ValueRatio, props.status, props.config.level, level, props.config.stack, summonedName)}{value.toString()}</td>,
                        value.addPercent(healPower || 0)
                    ];
                }
            })();

            const [content, label] = (() => {
                switch (key) {
                    case "targetHP":
                        return [
                            <FormattedMessage id="app.value.target-hp" values={{ratio: multipliedValue.toString()}} />,
                            <FormattedMessage id="app.label.target-hp" />
                        ]
                    case "targetLostHP":
                        return [
                            <FormattedMessage id="app.value.target-lost-hp" values={{ratio: multipliedValue.toString()}} />,
                            <FormattedMessage id="app.label.target-lost-hp" />
                        ]
                    case "lostHP":
                        return [
                            <FormattedMessage id="app.value.lost-hp" values={{ratio: multipliedValue.toString()}} />,
                            <FormattedMessage id="app.label.lost-hp" />
                        ]
                    case "targetMaxHP":
                        return [
                            <FormattedMessage id="app.value.target-maxhp" values={{ratio: multipliedValue.toString()}} />,
                            <FormattedMessage id="app.label.target-maxhp" />
                        ]
                    default:
                        return [null, null]
                }
            })();

            return [
                (
                    <>
                        {prev[0]}
                        {bracket ? <>(+</> : null}
                        {content}
                        {bracket ? <>)</> : null}
                    </>
                ),
                dynamicEquation ? 
                prev[1].concat(
                    <tr>
                        <td>{label}</td>
                        {dynamicEquation}
                    </tr>
                ) : prev[1]
            ];
        }, [<></>, [] as React.ReactNode[]]);
    })();

    const valueClass = (() => {
        return props.type ? style[props.type.type] : style.skill;
    })();

    const prohibitToggle = value?.isZero() != false &&
        (expandDescriptionsDynamic ?? []).length == 0

    return (
        <>
            <tr onClick={prohibitToggle ? undefined : toggleExpand}>
                <td>{props.label}</td>
                <td colSpan={3} className={valueClass}>{value?.isZero() && false ? null : value?.floor().toString()}{dynamicValue}{percent}</td>
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