import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.gap,
            1: Constants.damage.base,
            3: Constants.damage.amp,
            5: Constants.damage.level,
            6: Constants.vision,
            7: Constants.cooldown
        }
    } else {
        return {
            0: Constants.gap,
            1: Constants.damage,
            2: Constants.vision,
            3: Constants.cooldown
        }
    }
}

export default values;