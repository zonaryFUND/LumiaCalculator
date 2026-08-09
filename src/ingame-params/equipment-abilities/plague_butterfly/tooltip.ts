import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.damage.base,
            1: RatioPercent(Constants.damage.amp),
            2: Constants.range,
            3: Constants.max_bounce,
            4: Constants.damage_decline_per_bounce,
            5: Constants.cooldown,
            6: Constants.damage.level,
        }
    } else {
        return {
            0: Constants.damage,
            1: Constants.range,
            2: Constants.max_bounce,
            3: Constants.damage_decline_per_bounce,
            4: Constants.cooldown
        }
    }
}

export default values;