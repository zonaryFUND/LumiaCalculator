import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    1: Constants.time_bound,
    2: Constants.threshold_damage,
    3: Constants.duration,
    4: Constants.area,
    5: Constants.as,
    7: Constants.cooldown
})

export default values;