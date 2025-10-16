import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.threshold,
    1: Constants.damage_amp,
    2: Constants.cooldown
})

export default values;