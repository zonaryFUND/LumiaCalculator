import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";

const values: ItemSkillTooltipValuesHook = (_, values) =>{
    return {
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: values?.ms as number
    }
}

export default values;