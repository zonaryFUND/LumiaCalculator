import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: Constants.armor,
    2: Constants.max_stack,
    3: Constants.ms.duration,
    4: Constants.ms.effect,
<<<<<<< HEAD
    20: Constants.dot_period
=======
    20: Constants.dot_trigger_period
>>>>>>> recovery-9.0
})

export default values;