import { ItemSkillDamageTableGenerator, ItemSkillDamageTableUnit } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (_, values) => [
    {labelIntlID: "item-skill.shield", value: {base: values?.shield}, type: {type: "shield", target: "self"}}
]

export default tableValues;