import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    1: Constants.damage.targetHP,
    3: Constants.attack_speed,
    8: Constants.duration
})

export default values;