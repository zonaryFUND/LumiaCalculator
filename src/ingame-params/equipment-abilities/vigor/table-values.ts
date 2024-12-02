import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (damage, importedValues) => [
    {labelIntlID: "item-skill.additional-damage", value: damage!, triggeredOnBasicAttack: true}
]

export default tableValues;