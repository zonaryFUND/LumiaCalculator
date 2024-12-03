import { ValueRatio } from "app-types/value-ratio";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedValues }) => [
    {label: "item-skill.additional-damage", value: importedValues as ValueRatio, triggeredOnBasicAttack: true}
]

export default tableValues;