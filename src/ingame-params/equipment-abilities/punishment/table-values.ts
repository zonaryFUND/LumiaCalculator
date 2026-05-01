import { EquipmentAbilityDamageTableGenerator } from "../type";
import { ValueRatio } from "app-types/value-ratio";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage, importedValues }) => [
    {labelIntlID: "item-skill.heart-of-fire-damage", value: importedDamage as ValueRatio},
    {labelIntlID: "item-skill.shield", value: importedValues as ValueRatio, type: {type: "shield", target: "self"}}
]

export default tableValues;