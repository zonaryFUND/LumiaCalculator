import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (importedValues) => [
    {labelIntlID: "item-skill.additional-damage", value: importedValues, triggeredOnBasicAttack: true}
]

export default tableValues;