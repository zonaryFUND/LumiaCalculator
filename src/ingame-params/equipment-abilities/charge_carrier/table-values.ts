import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedValues }) => [
    {labelIntlID: "item-skill.shield", value: {base: importedValues?.shield}, type: {type: "shield", target: "self"}}
]

export default tableValues;