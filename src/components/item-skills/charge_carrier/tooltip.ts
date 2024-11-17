import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    return {
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: Constants.time_bound,
        5: Constants.movement_speed,
        10: values?.shield as number
    }
}

export default values;