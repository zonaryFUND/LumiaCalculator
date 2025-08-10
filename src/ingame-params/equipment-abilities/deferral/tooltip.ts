import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config }): TooltipValues => {
    const range = weaponRangeOf(config);

    if (showEquation) {
        return {
            0: Constants.melee,
            1: Constants.range,
            2: Constants.duration
        }
    } else {
        return {
            0: Constants[range],
            2: Constants.duration
        }
    }
}

export default values;