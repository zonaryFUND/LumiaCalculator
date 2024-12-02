import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (dmg, importedValues) => [
    {labelIntlID: "item-skill.additional-damage", value: dmg!, triggeredOnBasicAttack: true}
]

export default tableValues;