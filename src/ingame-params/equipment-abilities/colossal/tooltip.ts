import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.threshold,
    1: Constants.duration,
    2: Constants.shield.base,
    11: Constants.cooldown,
    13: Constants.cooldown,
    15: Constants.shield.additionalMaxHP,
    21: Constants.shield
})

export default values;