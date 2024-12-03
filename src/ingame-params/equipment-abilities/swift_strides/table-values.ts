import { EquipmentAbilityDamageTableGenerator } from "../type";

const tableValues: EquipmentAbilityDamageTableGenerator = ({ importedDamage }) => [
    {labelIntlID: "item-skill.max-additional-damage", value: importedDamage!, labelFormat: "{text}最大追加ダメージ", triggeredOnBasicAttack: true}
]

export default tableValues;