import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.shield-per-sec", value: Constants.shield, type: {type: "shield", target: "self"}},
    {labelIntlID: "item-skill.shield-max", value: Constants.max_shield, type: {type: "shield", target: "self"}}
]

export default tableValues;