import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.attack_speed,
    1: Constants.attack,
    2: Constants.max_stack,
    3: Constants.penetration,
    4: Constants.duration
})

export default values;