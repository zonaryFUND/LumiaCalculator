import * as React from "react";
import Constants from "components/subjects/kenneth/constants.json";
import { calculateValue } from "app-types/value-ratio/calculation";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { useMitigation } from "./mitigation-context";
import { useCombatHPContext } from "./combat-hp-context";
import mitigatedDamage from "./mitigated-damage";
import Decimal from "decimal.js";
import { FormattedMessage } from "react-intl";
import style from "../damage-table.module.styl";

type Props = {
    status: Status
    config: SubjectConfig
    onEEffect: boolean
}

const kennethHeal: React.FC<Props> = props => {
    const { targetMaxHP } = useCombatHPContext();
    const { dynamic } = calculateValue(Constants.T.damage, props.status, props.config, {skill: "T", level: props.config.skillLevels.T});
    const basePotency = targetMaxHP.percent(dynamic?.targetMaxHP ?? 0);
    
    const mitigation = useMitigation();
    const damageValue = (() => {
        const [skillDamage, trueDamage] = props.onEEffect ? [basePotency.times(0.8), basePotency.times(0.2)] : [basePotency, new Decimal(0)]
        return mitigatedDamage(skillDamage, mitigation, "skill", false)[0].add(trueDamage);
    })();

    const { static: healRatio } = calculateValue(Constants.T.heal, props.status, props.config, {skill: "T", level: props.config.skillLevels.T});
    const finalValue = damageValue.percent(healRatio);
    const maxHPRatio = finalValue.dividedBy(props.status.maxHP.calculatedValue).times(100).floor2();

    return (
        <>
            <tr>
                <td><FormattedMessage id={props.onEEffect ? "subject.kenneth.t-e-heal" : "subject.kenneth.t-heal"} /></td>
                <td className={style.heal}>{finalValue.floor().toString()}</td>
                <td className={style.heal}>{maxHPRatio.toString()}%</td>
            </tr>
        </>
    )

};

export default kennethHeal;