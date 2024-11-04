import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.shield", value: Constants.shield, type: {type: "shield", target: "self"}},
    {labelIntlID: "item-skill.enhanced-shield", value: Constants.shield, multiplier: 100 + Constants.enhance}
]

export default tableValues;