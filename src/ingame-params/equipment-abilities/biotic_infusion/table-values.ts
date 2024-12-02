import { ValueRatio } from "app-types/value-ratio";
import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = importedValues => [
    {labelIntlID: "item-skill.additional-damage", value: importedValues as ValueRatio, triggeredOnBasicAttack: true }
]

export default tableValues;