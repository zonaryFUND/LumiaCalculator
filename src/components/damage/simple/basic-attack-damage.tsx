import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";
import Decimal from "decimal.js";
import * as React from "react";
import { useToggle } from "react-use";
import style from "../damage-table.module.styl";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";

type Props = {
    name: React.ReactNode
    status: Status
    disableCritical?: boolean
    config?: {
        base?: number
        attack?: number
        basicAttackAmp?: number
    }
    multipliers?: [number, number | {label?: string, value: number}[]]
    summonedName?: string
}

const basicAttackDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);    
    const attackPower = React.useMemo(() => {
        return props.summonedName ? props.status.summonedStatus!.attackPower : props.status.attackPower.calculatedValue;
    }, [props.summonedName, props.status.attackPower, props.status.summonedStatus?.attackPower])

    const value = React.useMemo(() => {
        if (props.config) {
            return new Decimal(props.config.base ?? 0)
                    .add(attackPower.percent(props.config.attack ?? 0))
                    .floor()
                    .addPercent(props.config.basicAttackAmp && props.summonedName == undefined ? props.status.basicAttackAmp.calculatedValue : 0)
                    .floor()
        } else {
            return attackPower.addPercent(props.status.basicAttackAmp.calculatedValue).floor();
        }
    }, [attackPower, props.status.basicAttackAmp, props.config]);

    const [criticalChance, showCritical] = React.useMemo(() => {
        const critical = (props.summonedName ? props.status.summonedStatus!.criticalChance : props.status.criticalChance.calculatedValue);
        return [critical, critical.greaterThan(0)];
    }, [props.summonedName, props.status.criticalChance, props.status.summonedStatus?.criticalChance])
    
    const criticalDamage = React.useMemo(() => {
        return props.summonedName ? 0 : props.status.criticalDamage.calculatedValue;
    }, [props.summonedName, props.status.criticalDamage]);

    const critical = React.useMemo(() => {
        return value.addPercent(BaseCriticalDamagePercent.add(criticalDamage)).floor()
    }, [value, criticalDamage]);

    const expected = React.useMemo(() => {
        if (critical) {
            return value.percent(new Decimal(100).sub(criticalChance))
                .add(critical.percent(criticalChance))
                .round();
        } else {
            return value;
        }
    }, [value, criticalChance, critical])

    return (
        <>
            <tr onClick={toggleExpand}>
                <td colSpan={props.disableCritical ? 3 : undefined}>{props.name}</td>
                <td className={style.basic}>{value.percent(props.multipliers?.[0] ?? 100).toString()}</td>
                {
                    props.disableCritical ? null :
                    <>
                        <td className={style.basic}>{showCritical ? critical.percent(props.multipliers?.[0] ?? 100).toString() : "-"}</td>
                        <td className={style.basic}>{expected.percent(props.multipliers?.[0] ?? 100).toString()}</td>
                    </>
                }
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr>
                            <td><FormattedMessage id="app.standard-value" /></td>
                            {
                                props.multipliers ?
                                <td>
                                    {
                                        Array.isArray(props.multipliers[1]) ? 
                                        props.multipliers[1].reduce((prev, multiplier) => {
                                            if (typeof multiplier) {
                                                return <>{prev} x {multiplier}%</>
                                            } else {
                                                return <>{prev} x <span>{multiplier.label}</span>{multiplier.value}%</>
                                            }
                                        }, <>{value.toString()}</>)
                                        :
                                        <>{value.toString()} x {props.multipliers[1]}%</>
                                    }
                                    <> = {value.percent(props.multipliers?.[0] ?? 100).toString()}</>
                                </td> 
                                :
                                <td>
                                    {
                                        props.config?.base ?
                                        <>{props.config.base.toString()} + </> :
                                        null
                                    }
                                    <span className={table.small}>{props.summonedName}<FormattedMessage id="status.attack-power" /></span>{attackPower.toString()}
                                    {
                                        props.config?.attack ?
                                        <> x {props.config.attack}%</> :
                                        null
                                    }
                                    {
                                        props.status.basicAttackAmp.calculatedValue.greaterThan(0) && props.summonedName == undefined ?
                                        <> x (<span className={table.small}><FormattedMessage id="status.basic-attack-amp" /></span>{props.status.basicAttackAmp.calculatedValue.toString()}% + 1) = {value.toString()}<br /></>
                                        : null
                                    }
                                </td>
                            }
                        </tr>
                        {
                            props.disableCritical ? null :
                            <tr>
                                <td><FormattedMessage id="app.critical-hit" /></td>
                                {
                                    props.multipliers ?
                                    <td>
                                    {
                                        Array.isArray(props.multipliers[1]) ? 
                                        props.multipliers[1].reduce((prev, multiplier) => {
                                            if (typeof multiplier) {
                                                return <>{prev} x {multiplier}%</>
                                            } else {
                                                return <>{prev} x <span>{multiplier.label}</span>{multiplier.value}%</>
                                            }
                                        }, <>{critical.toString()}</>)
                                        :
                                        <>{critical.toString()} x {props.multipliers[1]}%</>
                                    }
                                    <> = {critical.percent(props.multipliers?.[0] ?? 100).toString()}</>
                                    </td>
                                    :
                                    <td><>
                                    <span className={table.small}><FormattedMessage id="app.standard-value" /></span>{value.toString()} x (<span className={table.small}><FormattedMessage id="status.critical-damage" /></span>
                                    {criticalDamage.toString()}% + 175%) = {critical?.toString()}
                                    </></td>
                                }
                            </tr>
                        }
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

export default basicAttackDamage;