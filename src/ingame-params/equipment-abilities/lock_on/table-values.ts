import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import { markDamageOf } from "./mark-damage";

const markDamageStrategy: UniqueValueStrategy = ({ status }) => {
    const value = markDamageOf(status);
    return {
        value: {
            type: "standard",
            value
        },
        equationExpression: [
            {
                expression: [
                    {ratioKey: "base"},
                    `${Constants.mark_damage.base} + `,
                    {ratioKey: "attack"},
                    `${status.attackPower.calculatedValue.toString()} x ${Constants.mark_damage.attack}% + `,
                    {ratioKey: "criticalChance"},
                    `${status.criticalStrikeChance.calculatedValue.toString()} x ${Constants.mark_damage.criticalChance}% = ${value.toString()}`
                ]
            }
        ]
    }
}

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.lock-on-basic-attack", value: Constants.damage, triggeredOnBasicAttack: true},
    {labelIntlID: "item-skill.lock-on-mark", value: markDamageStrategy}
]

export default tableValues;
