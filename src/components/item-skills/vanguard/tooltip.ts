import Constants from "./constants.json";
import { ItemSkillTooltipValues } from "../item-skill";

const values: ItemSkillTooltipValues = {
    0: Constants.threshold_maxhp,
    1: Constants.time_bound,
    2: Constants.threshold_damage,
    3: Constants.duration,
    4: Constants.area,
    5: Constants.as,
    7: Constants.cooldown,
    8: Constants.damage_mitigation
}

export default values;