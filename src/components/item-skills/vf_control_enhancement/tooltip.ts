import Constants from "./constants.json";
import { ItemSkillTooltipValues } from "../item-skill";

const values: ItemSkillTooltipValues = {
    0: `${Constants.cooldown_reduction[0]}%`,
    1: `${Constants.cooldown_reduction[1]}%`,
    2: `${Constants.cooldown_reduction[2]}%`,
    3: `${Constants.cooldown_reduction[3]}%`
}

export default values;