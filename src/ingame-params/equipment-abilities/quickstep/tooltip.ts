import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

<<<<<<< HEAD
const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    //1: Constants.movement_speed,
    2: Constants.max_stack,
    20: Constants.dot_period
})
=======
const values: EquipmentAbilityTooltipValues = ({ showEquation, config }) => {
    const base: TooltipValues = {
        0: Constants.duration,
        2: Constants.max_stack,
        20: Constants.dot_trigger_period
    }

    if (showEquation) {
        return {
            ...base,
            1: Constants.movement_speed.melee,
            2: Constants.movement_speed.range,
            3: Constants.max_stack
        }
    } else {
        const range = weaponRangeOf(config);

        return {
            ...base,
            1: Constants.movement_speed[range],
            2: Constants.max_stack
        }
    }
}
>>>>>>> recovery-9.0

export default values;