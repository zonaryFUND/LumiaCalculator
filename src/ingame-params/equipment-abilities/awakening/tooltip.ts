import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: Constants.attack_speed,
    2: Constants.movement_speed,
    3: Constants.cooldown
})

export default values;