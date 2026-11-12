import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.range,
            1: Constants.duration,
            2: Constants.shield.base,
            3: RatioPercent(Constants.shield.additionalMaxHP),
            4: Constants.shield.level,
            5: Constants.cooldown
        }
    } else {
        return {
            0: Constants.range,
            1: Constants.duration,
            2: Constants.shield,
            3: Constants.cooldown
        }
    }
}

export default values;