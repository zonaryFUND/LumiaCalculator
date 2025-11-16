import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) =>{
    return {
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: importedValues?.ms,
<<<<<<< HEAD
        20: Constants.dot_period
=======
        20: Constants.dot_trigger_period
>>>>>>> recovery-9.0
    }
}

export default values;