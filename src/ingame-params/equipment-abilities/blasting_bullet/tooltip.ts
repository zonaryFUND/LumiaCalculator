import Constants from "./constants.json";
import { ItemSkillTooltipValues } from "../item-skill";

const values: ItemSkillTooltipValues = {
    0: Constants.spark_max,
    1: Constants.damage, 
    2: Constants.damage.attack,
    3: Constants.cooldown
}

export default values;