import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot", value: Constants.damage},
    {labelIntlID: "item-skill.dot-max", intlValue: `${Constants.duration}`, value: Constants.damage, multiplier: Constants.duration * 100},
]

export default tableValues;