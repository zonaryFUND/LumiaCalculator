import Decimal from "decimal.js";
import * as React from "react";
import { useToggle } from "react-use";
import style from "../damage-table.module.styl";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import Constants from "components/subjects/rio/constants.json";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";

type Props = {
    status: Status
    config: SubjectConfig
}

export const HankyuMultiplier = Constants.Q.hankyu.attack;
export const DaikyuMultiplier = Constants.Q.daikyu.attack;

export function criticalAddition(status: Status): Decimal {
    return status.criticalChance.calculatedValue.percent(status.criticalDamage.calculatedValue.add(Constants.T.basic_attack_damage.criticalBase)).add(Constants.T.basic_attack_damage.base);
}

const basicAttackDamage: React.FC<Props> = props => {
    const [hankyuExpand, toggleHankyuExpand] = useToggle(false);
    const [daikyuExpand, toggleDaikyuExpand] = useToggle(false);

    const [hankyuBase, hankyuEquation] = React.useMemo(() => {
        const value = props.status.attackPower.calculatedValue.percent(Constants.Q.hankyu.attack).addPercent(props.status.basicAttackAmp.calculatedValue).floor();

        return [
            value,
            <><span><FormattedMessage id="status.attack-power" /></span>{props.status.attackPower.calculatedValue.toString()} x {Constants.Q.hankyu.attack}% x (<span><FormattedMessage id="status.basic-attack-amp" /></span>{props.status.basicAttackAmp.calculatedValue.toString()}% + 1) = {value.toString()}</>
        ]
    }, [props.status.attackPower, props.status.basicAttackAmp]);

    const [daikyuBase, daikyuEquation] = React.useMemo(() => {
        const value = props.status.attackPower.calculatedValue.percent(Constants.Q.daikyu.attack).addPercent(props.status.basicAttackAmp.calculatedValue);

        return [
            value,
            <><span><FormattedMessage id="status.attack-power" /></span>{props.status.attackPower.calculatedValue.toString()} x {Constants.Q.daikyu.attack}% x (<span><FormattedMessage id="status.basic-attack-amp" /></span>{props.status.basicAttackAmp.calculatedValue.toString()}% + 1) = {value.toString()}</>
        ]
    }, [props.status.attackPower, props.status.basicAttackAmp]);

    const [criticalEnhance, criticalEquation] = React.useMemo(() => {
        const value = criticalAddition(props.status).floor();
        return [
            value,
            <>{Constants.T.basic_attack_damage.base}% + (<span><FormattedMessage id="status.critical-chance" /></span>{props.status.criticalChance.calculatedValue.toString()}% x ({Constants.T.basic_attack_damage.criticalBase}% + <span><FormattedMessage id="status.critical-damage" /></span>{props.status.criticalDamage.calculatedValue.toString()}%)) = {value.toString()}%</>
        ]

    }, [props.status.criticalChance, props.status.criticalDamage])

    return (
        <>
            <tr onClick={toggleHankyuExpand}>
                <td colSpan={3}><FormattedMessage id="subject.rio.hankyu-aa" /></td>
                <td className={style.basic}>{hankyuBase.percent(criticalEnhance).floor().toString()}</td>
            </tr>
            {
                hankyuExpand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{hankyuEquation}</td></tr>
                        <tr><td><FormattedMessage id="subject.rio.passive-multiplier" /></td><td>{criticalEquation}</td></tr>
                    </InnerTable>
                </td></tr> :
                null
            }
            <tr>
                <td colSpan={3}><FormattedMessage id="subject.rio.hankyu-aa-2hit" /></td>
                <td className={style.basic}>{hankyuBase.percent(criticalEnhance).times(2).floor().toString()}</td>
            </tr>
            <tr className={table.border}><td colSpan={4}></td></tr>
            <tr onClick={toggleDaikyuExpand}>
                <td colSpan={3}><FormattedMessage id="subject.rio.daikyu-aa" /></td>
                <td className={style.basic}>{daikyuBase.percent(criticalEnhance).floor().toString()}</td>
            </tr>
            {
                daikyuExpand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{daikyuEquation}</td></tr>
                        <tr><td><FormattedMessage id="subject.rio.passive-multiplier" /></td><td>{criticalEquation}</td></tr>
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

export default basicAttackDamage;