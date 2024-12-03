import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) =>{
    return {
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: importedValues?.ms
    }
}

export default values;