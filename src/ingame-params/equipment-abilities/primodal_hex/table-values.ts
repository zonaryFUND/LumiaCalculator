import { ValueRatio } from "app-types/value-ratio";
import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (dmg, _) => [
    {labelIntlID: "item-skill.true", value: dmg as ValueRatio, type: {type: "true"}}
]

export default tableValues;