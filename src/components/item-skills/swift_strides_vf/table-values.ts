import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (importedValues) => [
    {labelIntlID: "item-skill.max-additional-damage", value: importedValues, labelFormat: "{text}最大追加ダメージ", triggeredOnBasicAttack: true}
]

export default tableValues;