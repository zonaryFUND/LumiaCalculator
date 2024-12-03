import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => [
    {intlValue: "item-skill.reflection-threshold", value: importedDamage!}
]

export default tableValues;