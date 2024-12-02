import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.additional-damage", value: Constants.damage, triggeredOnBasicAttack: true},
    {labelIntlID: "item-skill.heal", value: Constants.heal, type: {type: "heal", target: "self"}, triggeredOnBasicAttack: true}
]

export default tableValues;