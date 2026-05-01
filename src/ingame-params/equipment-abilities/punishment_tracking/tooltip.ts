import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    const base: TooltipValues = {
        0: Constants.threshold,
        1: Constants.count,
        2: Constants.duration,
        3: Constants.movement_speed
    }

    if (showEquation) {
        return {
            ...base,
            4: Constants.shield.base,
            5: RatioPercent(Constants.shield.attack),
            6: Constants.cooldown,
            8: Constants.shield.level
        }
    } else {
        return {
            ...base,
            4: Constants.shield,
            5: Constants.cooldown
        }
    }
}

export default values;