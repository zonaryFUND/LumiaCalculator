import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (damage, importedValues) => [
    {labelIntlID: "item-skill.max-additional-damage", value: damage!, labelFormat: "{text}最大追加ダメージ", triggeredOnBasicAttack: true}
]

export default tableValues;