import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => [
    {labelIntlID: "item-skill.dot", value: importedDamage!}
]

export default tableValues;