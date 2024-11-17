import Constants from "./constants.json";
import { ItemSkillTooltipValues } from "../item-skill";

const values: ItemSkillTooltipValues = {
    1: Constants.damage.targetHP,
    3: Constants.attack_speed,
    8: Constants.duration
}

export default values;