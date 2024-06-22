import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { Source } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { SkillValueProps } from "components/subjects/damage-table";
import { skillLevel } from "components/subjects/skill-damage";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useToggle } from "react-use";
import { useCombatHPContext } from "./combat-hp-context";
import { useMitigation } from "./mitigation-context";
import mitigatedDamage from "./mitigated-damage";

type Props = SkillValueProps & {
    config: SubjectConfig
    status: Status
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

    const [potency, potencyDescription] = (() => {
        if (!dynamicPotency) {
            return [
                staticPotency,   
                <tr><td><FormattedMessage id="app.label.potency" /></td><td>{staticPotency.toString()}</td></tr>
            ]
        }
        const [dynamicLabel, dynamicValue] = (() => {
            switch (Object.keys(dynamicPotency)[0]) {
                case "targetHP":
                    return [<FormattedMessage id="app.label.target-hp" />, targetHP];
                case "targetLostHP":
                    return [<FormattedMessage id="app.label.target-lost-hp" />, targetMaxHP.toNumber() - targetHP];
                case "lostHP":
                    return [<FormattedMessage id="app.label.lost-hp" />, props.status.maxHP.calculatedValue.toNumber() - hp];
                case "targetMaxHP":
                    return [<FormattedMessage id="app.label.lost-hp" />, targetMaxHP.toNumber()];
            }
            return [null, 0]
        })()

        return [
            staticPotency.add(dynamicValue),
            <tr>
                <td>軽減前ダメージ</td>
                <td>
                    <span>静的値</span>{staticPotency.toString()}
                    <span>{dynamicLabel}</span>{dynamicValue}
                </td>
            </tr>
        ]
    })();

    const mitigationContext = useMitigation();

    const [lastValue, mitigationDescriptions] = (() => {
        if (props.type == "true" || props.type == "ms" || props.type == "ratio") return [potency, null]
        if (props.type == "heal" || props.type == "shield") {
            const healPower = props.status.healPower.calculatedValue;
            return [
                potency.addPercent(healPower), 
                <tr><td>与える回復増加</td><td>{healPower.toString()}%</td></tr>
            ]
        }
        
        return mitigatedDamage(
            potency, 
            mitigationContext, 
            props.type == "basic" || props.type == "basic-nocrit" ? "basic" : "skill",
            props.type == "summoned"
        );
    })();

    const targetHPRatio = lastValue.dividedBy(targetHP).times(100).floor2();
    const enableExpand = potencyDescription != null || mitigationDescriptions != null;

    return (
        <>
            <tr onClick={enableExpand ? toggleExpand : undefined}>
                <td>{props.label}</td>
                <td>{lastValue.toString()}</td>
                <td>{targetHPRatio.toString()}%</td>
            </tr>
            {
                expand ? 
                <>
                    {potencyDescription}
                    {mitigationDescriptions}
                </>
                : null
            }
        </>
    )
}

export default skillDamage;