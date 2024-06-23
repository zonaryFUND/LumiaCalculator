import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { Source } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { SkillValueProps } from "components/subjects/damage-table";
import { skillLevel } from "components/subjects/skill-damage";
import * as React from "react";
import style from "../damage-table.module.styl";
import table from "components/common/table.styl";
import { FormattedMessage } from "react-intl";
import { useToggle } from "react-use";
import { useCombatHPContext } from "./combat-hp-context";
import { useMitigation } from "./mitigation-context";
import mitigatedDamage from "./mitigated-damage";
import InnerTable from "components/common/inner-table";
import Decimal from "decimal.js";

type Props = SkillValueProps & {
    config: SubjectConfig
    status: Status
    selfTarget?: boolean
}

const skillDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const level = props.skill == "item" ? -1 : skillLevel(props.skill, props.config);
    const {static: staticPotency, dynamic: dynamicPotency, dynamicValueOnly} = (() => {
        const source: Source = props.skill == "item" ? "item" : {skill: props.skill, level};
        const baseMultiplier = props.multiplier?.reduce((prev, current) => {
            const values = (current as any).basic ?? (current as any).value;
            const value = Array.isArray(values) ? values[level] : values;
            return prev * value  / 100;
        }, 100);
        return calculateValue(props.value, props.status, props.config, source, baseMultiplier);
    })();

    const { hp, targetHP, targetMaxHP } = useCombatHPContext();

    const [dynamicLabel, dynamicValue] = (() => {
        if (!dynamicPotency) return [null, null];

        const ratio = Object.values(dynamicPotency)[0];
        switch (Object.keys(dynamicPotency)[0]) {
            case "targetHP":
                return [<FormattedMessage id="app.label.target-hp" />, new Decimal(targetHP).percent(ratio).floor()];
            case "targetLostHP":
                return [<FormattedMessage id="app.label.target-lost-hp" />, targetMaxHP.sub(targetHP).percent(ratio).floor()];
            case "lostHP":
                return [<FormattedMessage id="app.label.lost-hp" />, props.status.maxHP.calculatedValue.sub(hp).percent(ratio).floor()];
            case "targetMaxHP":
                return [<FormattedMessage id="app.label.target-maxhp" />, (props.selfTarget && props.damageDependent == undefined ? props.status.maxHP.calculatedValue : targetMaxHP).percent(ratio).floor()];
        }
        return [null, null]
    })();

    const potency = staticPotency.add(dynamicValue ?? 0);
    const mitigationContext = useMitigation();

    const healPower = props.status.healPower.calculatedValue;
    const healPowerDescirption = healPower.greaterThan(0) ? <tr><td>与える回復増加</td><td>{healPower.toString()}%</td></tr> : null;
    const [mitigated, mitigationDescriptions] = (() => {
        if (props.type == "true" || props.type == "ms" || props.type == "ratio") return [potency, null]
        if ((props.type == "heal" && props.damageDependent == undefined) || props.type == "shield") {
            
            return [
                potency.addPercent(healPower), 
                healPowerDescirption
            ]
        }
        
        return mitigatedDamage(
            potency, 
            mitigationContext, 
            props.type == "basic" || props.type == "basic-nocrit" ? "basic" : "skill",
            props.type == "summoned"
        );
    })();

    const damageDependent = props.damageDependent ? (Array.isArray(props.damageDependent) ? props.damageDependent[level] : props.damageDependent) : undefined;
    const lastValue = damageDependent ? mitigated.percent(damageDependent).addPercent(healPower) : mitigated;

    const targetHPRatio = lastValue
        .dividedBy(props.selfTarget ? props.status.maxHP.calculatedValue : targetMaxHP)
        .times(100).floor2();
    const enableExpand = dynamicPotency != undefined ||
        mitigationDescriptions != null || 
        props.damageDependent != undefined;

    const valueClass = props.type ? style[props.type] : style.skill;

    return (
        <>
            <tr onClick={enableExpand ? toggleExpand : undefined}>
                <td>{props.label}</td>
                <td className={valueClass}>{lastValue.floor().toString()}{props.type == "ms" || props.type == "ratio" ? "%" : null}</td>
                {
                    props.type == "ms" || props.type == "ratio" ? <td>-</td> :
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
                                {healPowerDescirption}
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