import Constants from "./constants.json";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = () => [
    {labelIntlID: "item-skill.heart-of-fire-damage", value: Constants.damage},
    {labelIntlID: "item-skill.heart-of-fire-heal", value: Constants.damage, damageDependentHeal: Constants.heal}
]

export default tableValues;