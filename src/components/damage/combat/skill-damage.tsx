import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { Source } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { SkillValueProps } from "components/subjects/damage-table";
import { skillLevel } from "components/subjects/skill-damage";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useToggle } from "react-use";

type Props = SkillValueProps & {
    config: SubjectConfig
    status: Status
    hp: number
    targetStatus: Status
    targetHP: number
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

    const [potency, potencyDescription] = (() => {
        if (!dynamicPotency) {
            return [
                staticPotency,   
                (
                    <>
                        <tr><td>軽減前ダメージ</td><td>{staticPotency.toString()}</td></tr>
                    </>
                )
            ]
        }
        const dynamicValue = (() => {
            switch (Object.keys(dynamicPotency)[0]) {
                case "targetHP":
                    return [<FormattedMessage id="app.label.target-hp" />, props.targetHP];
                case "targetLostHP":
                    return [<FormattedMessage id="app.label.target-lost-hp" />, props.targetStatus.maxHP.calculatedValue.toNumber() - props.targetHP];
                case "lostHP":
                    return [<FormattedMessage id="app.label.lost-hp" />, props.status.maxHP.calculatedValue.toNumber() - props.hp];
                case "targetMaxHP":
                    return [<FormattedMessage id="app.label.lost-hp" />, props.targetStatus.maxHP.calculatedValue.toNumber()];
            }
        })()

        return [0, null]
    })();

    return (
        <>
            <tr>
                <td>{props.label}</td>
                <td></td>
            </tr>
        </>
    )
}