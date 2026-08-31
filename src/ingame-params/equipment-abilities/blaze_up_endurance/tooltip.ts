import Constants from "./constants";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: Constants.defense,
    2: Constants.max_stack,
    3: Constants.movement_speed,
    20: Constants.dot_trigger_period
})

export default values;