import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.additional-damage", value: Constants.damage},
    {labelIntlID: "item-skill.heal", value: Constants.heal, type: {type: "heal", target: "any"}}
]

export default tableValues;