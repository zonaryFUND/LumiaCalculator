import { EquipmentAbilityDamageTableUnit } from "../type";
import Constants from "./constants.json";

const tableValues: EquipmentAbilityDamageTableUnit[] = [
    {labelIntlID: "item-skill.shield", value: Constants.shield, type: {type: "shield", target: "self"}}
]

export default tableValues;