import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.time_bound,
            1: Constants.threshold,
            2: Constants.duration,
            3: Constants.damage.base,
            4: RatioPercent(Constants.damage.attack),
            5: Constants.damage.level,
            6: Constants.cooldown
        }
    } else {
        return {
            0: Constants.time_bound,
            1: Constants.threshold,
            2: Constants.duration,
            3: Constants.damage,
            4: Constants.cooldown
        }
    }
}

export default values;