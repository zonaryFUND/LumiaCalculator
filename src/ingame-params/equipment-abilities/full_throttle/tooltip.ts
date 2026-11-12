import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.attack_speed.duration,
    1: Constants.attack_speed.effect,
    2: Constants.attack_speed.max_stack,
    3: Constants.amp.duration,
    4: Constants.amp.effect,
    5: Constants.amp.max_stack,
    6: Constants.ms
})

export default values;