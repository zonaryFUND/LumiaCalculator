import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot", value: Constants.damage, type: {type: "true"}},
    {labelIntlID: "item-skill.dot-max", intlValue: `${Constants.duration}`, value: Constants.damage, multiplier: Constants.duration * 100, type: {type: "true"}}
]

export default tableValues;