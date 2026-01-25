import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.time_bound,
    1: Constants.count,
    2: Constants.after_effect,
    3: Constants.slow.duration,
    4: Constants.slow.effect,
    5: Constants.cooldown
})

export default values;