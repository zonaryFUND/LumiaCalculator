import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.attack,
    1: Constants.max_stack,
    2: Constants.duration
})

export default values;