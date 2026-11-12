import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.time_bound,
            1: Constants.threshold,
            2: Constants.damage.base,
            3: RatioPercent(Constants.damage.penetrationDefense),
            4: RatioPercent(Constants.damage.additionalAttack),
            5: Constants.duration,
            6: Constants.ms,
            7: Constants.cooldown
        }
    } else {
        return {
            0: Constants.time_bound,
            1: Constants.threshold,
            2: Constants.damage,
            3: Constants.duration,
            4: Constants.ms,
            5: Constants.cooldown
        }
    }
}

export default values;