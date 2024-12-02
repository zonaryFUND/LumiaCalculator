import Constants from "./constants.json";
import { ItemSkillTooltipValues } from "../item-skill";

const values: ItemSkillTooltipValues = {
    0: Constants.damage.base,
    1: Constants.damage.level,
    4: Constants.cooldown,
    5: Constants.damage
}

export default values;