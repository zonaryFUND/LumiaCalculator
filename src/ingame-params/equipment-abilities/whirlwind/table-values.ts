import { ItemSkillDamageTableUnit } from "../item-skill";
import Constants from "./constants.json";

const maxTick = Constants.duration / Constants.tick;

const tableValues: ItemSkillDamageTableUnit[] = [
    {labelIntlID: "item-skill.dot-tick", intlValue: `${Constants.tick}`, value: Constants.damage},
    {labelIntlID: "item-skill.dot-tick-max", intlValue: `${maxTick}`, value: Constants.damage, multiplier: maxTick * 100}
]

export default tableValues;