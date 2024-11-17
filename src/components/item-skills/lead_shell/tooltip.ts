import Constants from "./constants.json";
import { ItemSkillTooltipValues } from "../item-skill";

const values: ItemSkillTooltipValues = {
    0: Constants.dmg.base,
    2: Constants.slow.effect,
    4: Constants.slow.duration,
    6: Constants.cooldown,
    9: Constants.cooldown
}

export default values;