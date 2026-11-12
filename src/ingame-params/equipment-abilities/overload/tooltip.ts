import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.time_bound,
    1: Constants.threshold,
    2: Constants.duration,
    3: Constants.amp,
    4: Constants.cooldown_recovery,
    5: Constants.cooldown
})

export default values;