import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.time_bound,
    1: Constants.threshold,
    2: Constants.cooldown,
    3: Constants.duration,
    4: Constants.ms,
    10: Constants.shield.base,
    11: Constants.ms,
    13: Constants.shield.level,
    20: Constants.dot_trigger_period
})

export default values;