import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.tick,
            1: Constants.damage.base,
            2: Constants.damage.additionalHP,
            3: Constants.duration,
            4: Constants.slow,
            7: Constants.cooldown
        }
    } else {
        return {
            0: Constants.tick,
            1: Constants.damage,
            2: Constants.duration,
            3: Constants.slow,
            6: Constants.cooldown
        }
    }
}

export default values;