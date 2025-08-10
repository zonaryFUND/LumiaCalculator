import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.melee,
            1: Constants.range,
            2: Constants.effect_range
        }
    } else {
        const range = weaponRangeOf(config);
        return {
            0: Constants[range],
            1: Constants.effect_range
        }
    }
}

export default values;