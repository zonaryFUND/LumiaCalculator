import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (damage, importedValues) => [
    {intlValue: "item-skill.reflection-threshold", value: damage!}
]

export default tableValues;