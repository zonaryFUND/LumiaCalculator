import { BaseCriticalDamagePercent } from "components/subject/standard-values";
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
}

const basicAttackDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const value = React.useMemo(() => {
        if (props.config) {
            return new Decimal(props.config.base ?? 0)
                .add(props.status.attackPower.percent(props.config.attack ?? 0))
                .addPercent(props.config.basicAttackAmp ? props.status.basicAttackAmp : 0)
        } else {
            return props.status.attackPower.addPercent(props.status.basicAttackAmp);
        }
    }, [props.status.attackPower, props.status.basicAttackAmp, props.config]);

    const showCritical = React.useMemo(() => {
        return props.status.criticalChance.greaterThan(0);
    }, [props.status.criticalChance])

    const critical = React.useMemo(() => {
        return value.addPercent(BaseCriticalDamagePercent.add(props.status.criticalDamage))
    }, [value, props.status.criticalDamage]);

    const expected = React.useMemo(() => {
        if (critical) {
            return value.percent(new Decimal(100).sub(props.status.criticalChance))
                .add(critical.percent(props.status.criticalChance));
        } else {
            return value;
        }
    }, [value, critical, props.status.criticalChance])

    return (
        <>
            <tr onClick={toggleExpand}>
                <td colSpan={props.disableCritical ? 3 : undefined}>{props.name}</td>
                <td className={style.basic}>{value.toString()}</td>
                {
                    props.disableCritical ? null :
                    <>
                        <td className={style.basic}>{showCritical ? critical.toString() : "-"}</td>
                        <td className={style.basic}>{expected.toString()}</td>
                    </>
                }
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr>
                            <td>基本値</td>
                            <td>
                                <span>攻撃力</span>{props.status.attackPower.toString()}
                                {
                                    props.status.basicAttackAmp.greaterThan(0) ?
                                    <> x (<span>基本攻撃増幅</span>{props.status.basicAttackAmp.toString()}％ + 1) = {value.toString()}<br /></>
                                    : null
                                }
                            </td>
                        </tr>
                        {
                            props.disableCritical ? null :
                            <tr>
                                <td>致命打</td>
                                <td><><span>基礎値</span>{value.toString()} x (<span>致命打ダメージ量</span>{props.status.criticalDamage.toString()}％ + 175％) = {critical?.toString()}</></td>
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