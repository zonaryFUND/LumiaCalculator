import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot", value: Constants.damage},
    {labelIntlID: "item-skill.dot-max", intlValue: `${Constants.duration}`, value: Constants.damage, multiplier: Constants.duration * 100},
]

export default tableValues;