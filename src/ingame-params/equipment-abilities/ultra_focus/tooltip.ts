import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: Constants.max_stack,
    2: Constants.basic_attack_amp,
    3: Constants.target_switch_stack_loss
})

export default values;