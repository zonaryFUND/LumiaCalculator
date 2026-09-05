import { ValueRatio } from "core/value-ratio";
import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => [
    {label: "item-skill.additional-damage", value: importedDamage as ValueRatio, triggeredOnBasicAttack: true}
]

export default tableValues;