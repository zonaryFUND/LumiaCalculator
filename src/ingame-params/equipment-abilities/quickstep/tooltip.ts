import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: Constants.movement_speed,
    2: Constants.max_stack,
})

export default values;