import Constants from "./constants.json";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = () => [
    {labelIntlID: "item-skill.shield", value: Constants.shield.effect, type: {type: "shield", target: "self"}}
]

export default tableValues;