import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.shield", value: Constants.shield, type: {type: "shield", target: "self"}},
    {labelIntlID: "item-skill.enhanced-shield", value: Constants.shield, multiplier: 100 + Constants.enhance, type: {type: "shield", target: "self"}}
]

export default tableValues;