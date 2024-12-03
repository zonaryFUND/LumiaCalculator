import { ValueRatio } from "app-types/value-ratio";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => [
    {labelIntlID: "item-skill.true", value: importedDamage as ValueRatio, type: {type: "true"}}
]

export default tableValues;