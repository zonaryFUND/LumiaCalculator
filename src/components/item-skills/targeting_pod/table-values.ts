import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.additional-damage", value: Constants.damage},
    {labelIntlID: "item-skill.heal", value: Constants.heal, type: {type: "heal", target: "any"}}
]

export default tableValues;