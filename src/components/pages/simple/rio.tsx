import { AssaultRifleAttackRatio, BaseCriticalDamagePercent } from "components/subject/standard-values";
import { Status } from "components/subject/status";
import Decimal from "decimal.js";
import * as React from "react";
import { useToggle } from "react-use";
import style from "./damage-table.module.styl";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import Constants from "components/subjects/rio/constants.json";
import { SubjectConfig } from "app-types/subject-dynamic/config";

type Props = {
    status: Status
    config: SubjectConfig
}

const basicAttackDamage: React.FC<Props> = props => {
    const [hankyuExpand, toggleHankyuExpand] = useToggle(false);
    const [daikyuExpand, toggleDaikyuExpand] = useToggle(false);

    const [hankyuBase, hankyuEquation] = React.useMemo(() => {
        const value = props.status.attackPower.percent(Constants.Q.hankyu.attack).addPercent(props.status.basicAttackAmp).floor();

        return [
            value,
            <><span>攻撃力</span>{props.status.attackPower.toString()} x {Constants.Q.hankyu.attack}％ x (<span>基本攻撃増幅</span>{props.status.basicAttackAmp.toString()}％ + 1) = {value.toString()}</>
        ]
    }, [props.status.attackPower, props.status.basicAttackAmp]);

    const [daikyuBase, daikyuEquation] = React.useMemo(() => {
        const value = props.status.attackPower.percent(Constants.Q.daikyu.attack).addPercent(props.status.basicAttackAmp);

        return [
            value,
            <><span>攻撃力</span>{props.status.attackPower.toString()} x {Constants.Q.daikyu.attack}％ x (<span>基本攻撃増幅</span>{props.status.basicAttackAmp.toString()}％ + 1) = {value.toString()}</>
        ]
    }, [props.status.attackPower, props.status.basicAttackAmp]);

    const [criticalEnhance, criticalEquation] = React.useMemo(() => {
        const criticalDamage = props.status.criticalDamage.add(Constants.T.basic_attack_damage.criticalBase);
        const value = new Decimal(Constants.T.basic_attack_damage.base)
            .add(props.status.criticalChance.times(criticalDamage).dividedBy(100)).floor();
        return [
            value,
            <>{Constants.T.basic_attack_damage.base}％ + (<span>致命打確率</span>{props.status.criticalChance.toString()}％ x ({Constants.T.basic_attack_damage.criticalBase}％ + <span>致命打ダメージ上昇</span>{props.status.criticalDamage.toString()}％)) = {value.toString()}％</>
        ]

    }, [props.status.criticalChance, props.status.criticalDamage])

    return (
        <>
            <tr onClick={toggleHankyuExpand}>
                <td colSpan={3}>短弓基本攻撃</td>
                <td className={style.basic}>{hankyuBase.percent(criticalEnhance).floor().toString()}</td>
            </tr>
            {
                hankyuExpand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr><td>基礎値</td><td>{hankyuEquation}</td></tr>
                        <tr><td>T倍率</td><td>{criticalEquation}</td></tr>
                    </InnerTable>
                </td></tr> :
                null
            }
            <tr>
                <td colSpan={3}>短弓基本攻撃(2発分)</td>
                <td className={style.basic}>{hankyuBase.percent(criticalEnhance).times(2).floor().toString()}</td>
            </tr>
            <tr className={table.border}><td colSpan={4}></td></tr>
            <tr onClick={toggleDaikyuExpand}>
                <td colSpan={3}>長弓基本攻撃</td>
                <td className={style.basic}>{daikyuBase.percent(criticalEnhance).floor().toString()}</td>
            </tr>
            {
                daikyuExpand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr><td>基礎値</td><td>{daikyuEquation}</td></tr>
                        <tr><td>T倍率</td><td>{criticalEquation}</td></tr>
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

export default basicAttackDamage;