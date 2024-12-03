import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => [
    {labelIntlID: "item-skill.additional-damage", value: importedDamage!, triggeredOnBasicAttack: true}
]

export default tableValues;