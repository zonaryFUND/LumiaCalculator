import * as React from "react";
import style from "../../../damage-table.module.styl";
import { useToggle } from "react-use";
import table from "components/common/table.module.styl";
import InnerTable from "components/common/inner-table";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { RatioKeys, ValueRatio } from "app-types/value-ratio";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";
import { calculateValue } from "app-types/value-ratio/calculation";
import { extractMultiplier } from "../../../damage-table-util";
import StaticValueEquation from "../subrows/static-value-equation";
import MultiplyEquation from "../subrows/mutiply-equation";
import HealPower from "../subrows/heal-power";
import { DamageTableUnit } from "app-types/damage-table/unit";
import Decimal from "decimal.js";
import { omit } from "es-toolkit";

type Props = Omit<DamageTableUnit, "value"> & {
    skillLevel?: number
    value: ValueRatio
    config: SubjectConfig
    status: Status
    hp: number
}

const standardDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const {static: staticBaseValue, dynamic: dynamicBaseValue, dynamicValueOnly} = calculateValue(props.value, props.status, props.config, props.skillLevel);

    const multiplier = extractMultiplier(props.skillLevel, props.multiplier);    
    const healPower = (props.type?.type == "heal") && props.status.healerGiveHpHealRatio.calculatedValue.greaterThan(0) ?
            props.status.healerGiveHpHealRatio.calculatedValue : null;
    const percent = React.useMemo(() => props.type && ("percentExpression" in props.type) && props.type.percentExpression, [props.type]);

    const [staticFinalValue, staticSubRows] = (() => {
        if (dynamicValueOnly) return [null, [] as React.ReactElement[]]

        const staticBaseValueHealConcerned = staticBaseValue.addPercent(healPower || 0);
        if (multiplier) {
            return [
                staticBaseValueHealConcerned.percent(multiplier[0]),
                [<MultiplyEquation key="multiply" baseValue={staticBaseValueHealConcerned} multiplier={multiplier} percent={percent} />]
            ]
        } else {
            const baseOnly = Object.keys(props.value).length == 1 && "base" in props.value;
            return [
                staticBaseValueHealConcerned,
                [
                    baseOnly ? undefined :
                    <StaticValueEquation
                        key="equation"
                        label={dynamicBaseValue != undefined ? <FormattedMessage id="app.static-value" /> : undefined}
                        skillLevel={props.skillLevel}
                        config={props.config}
                        status={props.status}
                        ratio={props.value}
                        calculated={<>{staticBaseValue.toString()}{percent}</>}
                    />,
                    healPower ? <HealPower key="healpower" baseValue={staticBaseValue} healPower={healPower} /> : undefined
                ]
                .filter((item): item is React.ReactElement => item != undefined)
            ]
        }
    })();

    const lostHP = props.status.maxHp.calculatedValue.sub(props.hp);
    const [dynamicFinalValue, dynamicSubRows] = (() => {
        if (dynamicBaseValue == undefined) return [[] as React.ReactElement[], [] as React.ReactElement[]];
        
        return Object.entries(dynamicBaseValue)
            .map(([key, value]) => {
                const dynamicValueHealConcerned = value.addPercent(healPower || 0);
                const [valueIntlID, labelIntlID] = (() => {
                    switch (key) {
                        case "targetHP":        return ["app.value.target-hp", "app.label.target-hp"];
                        case "targetLostHP":    return ["app.value.target-lost-hp", "app.label.target-lost-hp"];
                        case "lostHP":          return ["app.value.lost-hp", "app.label.lost-hp"];
                        case "targetMaxHP":     return ["app.value.target-maxhp", "app.label.target-maxhp"];
                        default:                return [undefined, undefined];
                    }
                })();

                if (multiplier) {
                    const ratio = dynamicValueHealConcerned.percent(multiplier[0]);
                    return {
                        key,
                        value: (
                            <>
                                <FormattedMessage id={valueIntlID} values={{ratio: ratio.toString()}} />,
                                {key == "lostHP" ? `(${lostHP.percent(ratio).floor().toString()})` : null}
                            </>
                        ),
                        subrows: [
                            <MultiplyEquation key={`${key}-multiply`} baseValue={dynamicValueHealConcerned} multiplier={multiplier} percent={percent} />
                        ]
                    }
                } else {
                    const targetRatio = props.value[key as RatioKeys];
                    const showEquation = typeof targetRatio == "object" && !Array.isArray(targetRatio);
                    const showConstant = !showEquation && (!dynamicValueOnly || healPower);
                    return {
                        key,
                        value: (
                            <>
                                <FormattedMessage id={valueIntlID} values={{ratio: dynamicValueHealConcerned.toString()}} />
                                {key == "lostHP" ? `(${lostHP.percent(dynamicValueHealConcerned).floor().toString()})` : null}
                            </>
                        ),
                        subrows: [
                            showEquation ?
                            <StaticValueEquation
                                key={`${key}-equation`}
                                label={<FormattedMessage id={labelIntlID} />}
                                skillLevel={props.skillLevel}
                                config={props.config}
                                status={props.status}
                                ratio={targetRatio as ValueRatio}
                                calculated={<>{value.toString()}</>}
                                percent={true}
                            /> : 
                            undefined,
                            showConstant ? <tr key={`${key}-constant`}><td><FormattedMessage id={labelIntlID} /></td><td>{value.toString()}%</td></tr> : undefined,
                            healPower ? <HealPower key={`${key}-healpower`} baseValue={value} healPower={healPower} percent={true} /> : undefined
                        ]
                        .filter((item): item is React.ReactElement => item != undefined)
                    }
                }
            })
            .reduce((prev, {key, value, subrows}, index) => {
                const encloseValueInBrackets = index > 0 || !dynamicValueOnly;
                return [
                    prev[0].concat(<React.Fragment key={key}>
                        {encloseValueInBrackets ? <>(+</> : null}
                        {value}
                        {encloseValueInBrackets ? <>)</> : null}
                    </React.Fragment>),
                    prev[1].concat(subrows)
                ];
            }, [[] as React.ReactElement[], [] as React.ReactElement[]])
    })();

    const valueClass = (() => {
        return props.type ? style[props.type.type] : style.skill;
    })();

    return (
        <>
            <tr onClick={staticSubRows.length + dynamicSubRows.length > 0 ? toggleExpand : undefined}>
                <td>{props.label}</td>
                <td colSpan={3} className={valueClass}>{staticFinalValue?.floor().toString()}{dynamicFinalValue}{percent ? "%" : null}</td>
            </tr>
            {
                staticSubRows.length + dynamicSubRows.length > 0 ?
                <tr className={table.expand} style={!expand ? {display: "none"} : undefined}><td colSpan={4}>
                    <InnerTable>
                        {staticSubRows}
                        {dynamicSubRows}
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

export default standardDamage;