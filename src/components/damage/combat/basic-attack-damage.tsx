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

type UnitProps = {
    name: React.ReactNode
    potency: Decimal
    attackSpeed: Decimal
    summoned: boolean
}

const Unit: React.FC<UnitProps> = props => {
    const damageExpression = useDamageExpression();
    const { targetMaxHP } = useCombatHPContext();
    const [expand, toggleExpand] = useToggle(false);

    const mitigation = useMitigation();
    const [finalDamage, descriptions] = mitigatedDamage(props.potency, mitigation, "basic", props.summoned);

    const healthRatio = finalDamage.dividedBy(targetMaxHP).times(100).floor2();
    const dps = finalDamage.times(props.attackSpeed);
    const dpsHealthRatio = healthRatio.times(props.attackSpeed).floor2();

    return (
        <>
            <tr>
                <td>{props.name}</td>
                <td className={style.basic}>{(damageExpression == "damage" ? finalDamage.floor() : dps).toString()}</td>
                <td className={style.basic}>{(damageExpression == "damage" ? healthRatio : dpsHealthRatio).toString()}%</td>
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={3}>
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.label.potency" /></td><td>{props.potency.floor().toString()}</td></tr>
                        {descriptions}
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

const basicAttackDamage: React.FC<Props> = props => {
    const basePotency = new Decimal(props.config.base ?? 0)
        .add(props.status.attackPower.calculatedValue.percent(props.config.attack ?? 0))
        .floor()
        .addPercent(props.config.basicAttackAmp && props.summonedName == undefined ? props.status.basicAttackAmp.calculatedValue : 0)
        .percent(props.multiplier ?? 100)
        .floor();

    const critRate = props.summonedName != undefined ? props.status.summonedStatus!.criticalChance : props.status.criticalChance.calculatedValue;
    const critDamage = BaseCriticalDamagePercent.add(props.summonedName != undefined ? 0 : props.status.criticalDamage.calculatedValue);

    return (
        <>
            <Unit name={props.name} potency={basePotency} attackSpeed={props.status.attackSpeed.calculatedValue} summoned={props.summonedName != undefined} />
            {
                props.disableCritical != true && critRate.greaterThan(0) ?
                <>
                    <Unit name={<>{props.name}(致命打)</>} potency={basePotency.addPercent(critDamage)} attackSpeed={props.status.attackSpeed.calculatedValue} summoned={props.summonedName != undefined} />
                    <Unit name={<>{props.name}(期待値)</>} potency={basePotency.times(critDamage.dividedBy(100).percent(critRate).add(1))} attackSpeed={props.status.attackSpeed.calculatedValue} summoned={props.summonedName != undefined} />
                </>
                : null
            }
        </>
    )
}

export default basicAttackDamage;