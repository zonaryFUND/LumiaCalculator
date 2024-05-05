import { AssaultRifleAttackRatio, BaseCriticalDamagePercent } from "components/subject/standard-values";
import { Status } from "components/subject/status";
import Decimal from "decimal.js";
import * as React from "react";
import { useToggle } from "react-use";
import style from "./damage-table.module.styl";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";

type Props = {
    name: string
    status: Status
    disableCritical?: boolean
    config?: {
        base?: number
        attack?: number
        basicAttackAmp?: number
    }
    multiplier?: number
    summoned?: boolean
}

const basicAttackDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const attackPower = React.useMemo(() => {
        return props.summoned ? props.status.summonedStatus!.attackPower : props.status.attackPower;
    }, [props.summoned, props.status.attackPower, props.status.summonedStatus?.attackPower])

    const value = React.useMemo(() => {
        if (props.config) {
            return new Decimal(props.config.base ?? 0)
                    .add(attackPower.percent(props.config.attack ?? 0))
                    .floor()
                    .addPercent(props.config.basicAttackAmp && props.summoned != true ? props.status.basicAttackAmp : 0)
                    .floor()
        } else {
            return attackPower.addPercent(props.status.basicAttackAmp).floor();
        }
    }, [attackPower, props.status.basicAttackAmp, props.config]);

    const [criticalChance, showCritical] = React.useMemo(() => {
        const critical = (props.summoned ? props.status.summonedStatus! : props.status).criticalChance;
        return [critical, critical.greaterThan(0)];
    }, [props.summoned, props.status.criticalChance, props.status.summonedStatus?.criticalChance])
    
    const criticalDamage = React.useMemo(() => {
        return props.summoned ? 0 : props.status.criticalDamage;
    }, [props.summoned, props.status.criticalDamage]);

    const critical = React.useMemo(() => {
        return value.addPercent(BaseCriticalDamagePercent.add(criticalDamage)).floor()
    }, [value, criticalDamage]);

    const expected = React.useMemo(() => {
        if (critical) {
            return value.percent(new Decimal(100).sub(criticalChance))
                .add(critical.percent(criticalChance));
        } else {
            return value;
        }
    }, [value, criticalChance, critical])

    return (
        <>
            <tr onClick={toggleExpand}>
                <td colSpan={props.disableCritical ? 3 : undefined}>{props.name}</td>
                <td className={style.basic}>{value.percent(props.multiplier ?? 100).toString()}</td>
                {
                    props.disableCritical ? null :
                    <>
                        <td className={style.basic}>{showCritical ? critical.percent(props.multiplier ?? 100).toString() : "-"}</td>
                        <td className={style.basic}>{expected.percent(props.multiplier ?? 100).toString()}</td>
                    </>
                }
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr>
                            <td>基本値</td>
                            {
                                props.multiplier ?
                                <td>
                                    {value.toString()} x {props.multiplier}％ = {value.percent(props.multiplier).toString()}
                                </td> 
                                :
                                <td>
                                    {
                                        props.config?.base ?
                                        <>{props.config.base.toString()} + </> :
                                        null
                                    }
                                    <span>攻撃力</span>{attackPower.toString()}
                                    {
                                        props.config?.attack ?
                                        <> x {props.config.attack}％</> :
                                        null
                                    }
                                    {
                                        props.status.basicAttackAmp.greaterThan(0) && props.summoned != true ?
                                        <> x (<span>基本攻撃増幅</span>{props.status.basicAttackAmp.toString()}％ + 1) = {value.toString()}<br /></>
                                        : null
                                    }
                                </td>
                            }
                        </tr>
                        {
                            props.disableCritical ? null :
                            <tr>
                                <td>致命打</td>
                                {
                                    props.multiplier ?
                                    <td>{critical.toString()} x {props.multiplier}％ = {critical.percent(props.multiplier).toString()}</td>
                                    :
                                    <td><>
                                        <span>基礎値</span>{value.toString()} x (<span>致命打ダメージ量</span>
                                        {criticalDamage.toString()}％ + 175％) = {critical?.toString()}
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