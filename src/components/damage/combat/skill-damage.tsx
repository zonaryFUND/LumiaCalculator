import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { Source } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { SubjectDamageTableUnit } from "components/subjects/damage-table";
import * as React from "react";
import style from "../damage-table.module.styl";
import table from "components/common/table.styl";
import { FormattedMessage, useIntl } from "react-intl";
import { useToggle } from "react-use";
import { useCombatHPContext } from "./combat-hp-context";
import { useMitigation } from "./mitigation-context";
import mitigatedDamage from "./mitigated-damage";
import InnerTable from "components/common/inner-table";
import Decimal from "decimal.js";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
//import { extractMultiplier, extractskillLevel } from "../damage-table-util";

type Props = SubjectDamageTableUnit & {
    config: SubjectConfig
    status: Status
    selfTarget?: boolean
}

/*
const skillDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const level = extractskillLevel(props, props.config);
    const {static: staticPotency, dynamic: dynamicPotency, dynamicValueOnly} = (() => {
        const source = (props.skill == "other" || (props.skill as any).tacticalLevel != undefined) ? "other" : {skill: props.skill, level} as Source;
        const multiplier = extractMultiplier(level, props.multiplier)?.[0];
        if (typeof props.value == "function") {
            return {static: props.value(props.config, props.status).value, dynamic: 0, dynamicValueOnly: false};
        } else {
            return calculateValue(props.value, props.status, props.config, source, multiplier);
        }
    })();

    const selfTarget = props.type?.type == "heal" || props.type?.type == "shield" && props.type.target == "self";

    const { hp, targetHP, targetMaxHP } = useCombatHPContext();

    const [dynamicLabel, dynamicValue] = (() => {
        if (!dynamicPotency) return [null, null];

        const ratio = Object.values(dynamicPotency)[0];
        switch (Object.keys(dynamicPotency)[0]) {
            case "targetHP":
                return [<FormattedMessage id="app.label.target-hp" />, new Decimal(targetHP).percent(ratio).floor()];
            case "targetLostHP":
                return [<FormattedMessage id="app.label.target-lost-hp" />, (props.type?.type == "heal" && selfTarget ? props.status.maxHP.calculatedValue.sub(hp) : targetMaxHP.sub(targetHP)).percent(ratio).floor()];
            case "lostHP":
                return [<FormattedMessage id="app.label.lost-hp" />, props.status.maxHP.calculatedValue.sub(hp).percent(ratio).floor()];
            case "targetMaxHP":
                return [<FormattedMessage id="app.label.target-maxhp" />, (selfTarget && props.damageDependent == undefined ? props.status.maxHP.calculatedValue : targetMaxHP).percent(ratio).floor()];
        }
        return [null, null]
    })();

    const potency = staticPotency.add(dynamicValue ?? 0);
    const mitigationContext = useMitigation();

    const healPower = props.status.healPower.calculatedValue;
    const healPowerDescription = healPower.greaterThan(0) ? <tr><td>与える回復増加</td><td>{healPower.toString()}%</td></tr> : null;
    const [mitigated, mitigationDescriptions] = (() => {
        if (props.type?.type == "true" || props.type?.type == "misc" || props.type?.type == "shield") return [potency, null]
        if (((props.type?.type == "heal") && props.damageDependent == undefined)) {
            
            return [
                potency.addPercent(healPower), 
                healPowerDescription
            ]
        }
        
        return mitigatedDamage(
            potency, 
            mitigationContext, 
            props.type?.type == "basic" ? "basic" : "skill",
            (props.type as any).fromSummoned == true
        );
    })();

    const damageDependent = props.damageDependent ? (Array.isArray(props.damageDependent) ? props.damageDependent[level] : props.damageDependent) : undefined;
    const lastValue = damageDependent ? mitigated.percent(damageDependent).addPercent(healPower) : mitigated;

    const targetHPRatio = lastValue
        .dividedBy(selfTarget ? props.status.maxHP.calculatedValue : targetMaxHP)
        .times(100).floor2();
    const enableExpand = dynamicPotency != undefined ||
        mitigationDescriptions != null || 
        props.damageDependent != undefined;

    const valueClass = props.type ? style[props.type.type] : style.skill;

    return (
        <>
            <tr onClick={enableExpand ? toggleExpand : undefined}>
                <td>{props.label}</td>
                <td className={valueClass}>{lastValue.floor().toString()}{props.type?.type == "misc" && (props.type?.percentExpression) ? "%" : null}</td>
                {
                    props.type?.type == "misc" ? <td>-</td> :
                    <td className={valueClass}>{targetHPRatio.toString()}%</td>
                }
            </tr>
            {
                expand ? 
                <tr className={table.expand}><td colSpan={3}>
                    <InnerTable>
                        {
                            props.damageDependent ?
                            <tr>
                                <td><FormattedMessage id={"app.label.reference-damage"} /></td>
                                <td>{mitigated.floor().toString()}</td>
                            </tr>
                            :
                            <tr>
                                <td><FormattedMessage id={"app.label.potency"} /></td>
                                <td>
                                    {
                                        dynamicValue == null ? 
                                        staticPotency.floor().toString() : 
                                        <>
                                            {dynamicValueOnly ? null : <><span className={table.small}>静的値</span>{staticPotency.floor().toString()} + </>}
                                            <><span className={table.small}>{dynamicLabel}</span>{dynamicValue.toString()}</>
                                        </>
                                    }
                                </td>
                            </tr>
                        }

                        {damageDependent ? null : mitigationDescriptions}
                        {
                            damageDependent ? 
                            <>
                                <tr>
                                    <td><FormattedMessage id="app.label.multiplier" /></td>
                                    <td>{damageDependent}%</td>
                                    
                                </tr>
                                {healPowerDescription}
                            </>
                            : null
                        }
                    </InnerTable>
                </td></tr>
                : null
            }
        </>
    )
}

export default skillDamage;
*/