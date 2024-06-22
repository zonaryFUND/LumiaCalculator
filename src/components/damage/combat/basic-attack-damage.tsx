import { AssaultRifleAttackRatio, BaseCriticalDamagePercent } from "components/subject/standard-values";
import Decimal from "decimal.js";
import * as React from "react";
import { useToggle } from "react-use";
import style from "../damage-table.module.styl";
import table from "components/common/table.styl";
import InnerTable from "components/common/inner-table";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";
import { useDamageExpression } from "./damage-ratio-context";
import { useMitigation } from "./mitigation-context";
import mitigatedDamage from "./mitigated-damage";
import { useCombatHPContext } from "./combat-hp-context";

type Props = {
    name: React.ReactNode
    status: Status
    disableCritical?: boolean
    config: {
        base?: number
        attack?: number
        basicAttackAmp?: number
    }
    multiplier?: number
    summonedName?: string
}

/*
const Unit: React.FC = props => {
    const damageExpression = useDamageExpression();
    const [expand, toggleExpand] = useToggle(false);


}
*/

const basicAttackDamage: React.FC<Props> = props => {
    const damageExpression = useDamageExpression();
    const [expand, toggleExpand] = useToggle(false);

    const mitigation = useMitigation();

    const potency = new Decimal(props.config.base ?? 0)
        .add(props.status.attackPower.calculatedValue.percent(props.config.attack ?? 0))
        .floor()
        .addPercent(props.config.basicAttackAmp && props.summonedName == undefined ? props.status.basicAttackAmp.calculatedValue : 0)
        .percent(props.multiplier ?? 100)
        .floor();

    const [finalDamage, descriptions] = mitigatedDamage(potency, mitigation, "basic", props.summonedName != undefined);
    const { targetMaxHP } = useCombatHPContext();

    const dps = finalDamage.times(props.status.attackSpeed.calculatedValue).floor();
    const healthRatio = finalDamage.dividedBy(targetMaxHP).times(100).floor2();
    const dpsHealthRatio = dps.dividedBy(targetMaxHP).times(100).floor2();




    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.name}</td>
                <td className={style.basic}>{(damageExpression == "damage" ? finalDamage.floor() : dps).toString()}</td>
                <td className={style.basic}>{(damageExpression == "damage" ? healthRatio : dpsHealthRatio).toString()}%</td>
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={3}>
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.label.potency" /></td><td>{potency.floor().toString()}</td></tr>
                        {descriptions}
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

export default basicAttackDamage;