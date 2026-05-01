import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => {
    return {
        0: Constants.duration,
        1: Constants.effect
    }
}

export default values;