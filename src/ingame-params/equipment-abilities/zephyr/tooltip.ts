import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.time_bound,
    1: Constants.threshold,
    2: Constants.cooldown,
    3: Constants.duration,
    4: Constants.ms,
    10: Constants.shield.base,
    11: Constants.ms
})

export default values;