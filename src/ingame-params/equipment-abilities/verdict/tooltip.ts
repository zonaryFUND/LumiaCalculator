import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.penetration_threshold,
    1: Constants.cooldown,
    2: Constants.hp_threshold
})

export default values;