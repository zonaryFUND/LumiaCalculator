import { ValueRatio } from "app-types/value-ratio";
import { ItemSkillDamageTableGenerator } from "../item-skill";

const tableValues: ItemSkillDamageTableGenerator = (importedValues) => [
    {labelIntlID: "item-skill.dot", value: importedValues as ValueRatio}
]

export default tableValues;