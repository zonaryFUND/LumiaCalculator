import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.spirit-harvest-add", value: Constants.first_damage},
    {labelIntlID: "item-skill.spirit-harvest-remove", value: Constants.second_damage}
]

export default tableValues;