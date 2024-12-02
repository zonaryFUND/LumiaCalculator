import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (damage, importedValues) => [
    {labelIntlID: "item-skill.dot", value: damage!}
]

export default tableValues;