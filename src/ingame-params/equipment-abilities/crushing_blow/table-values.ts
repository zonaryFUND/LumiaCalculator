import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage, importedValues }) => [
    {labelIntlID: "item-skill.additional-damage", value: importedDamage!, triggeredOnBasicAttack: true},
    {labelIntlID: "item-skill.heal", value: importedValues!.heal, triggeredOnBasicAttack: true, type: {type: "heal", target: "self"}}
]

export default tableValues;