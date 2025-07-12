import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.damage.base,
            1: Constants.range,
            2: Constants.threshold,
            3: Constants.damage.additionalMaxHP,
            4: Constants.damage.level
        }
    } else {
        return {
            0: Constants.damage,
            1: Constants.range,
            2: Constants.threshold
        }
    }
}

export default values;