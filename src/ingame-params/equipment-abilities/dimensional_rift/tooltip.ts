import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    const base: TooltipValues = {
        0: Constants.duration,
        1: Constants.damage_increase
    }

    if (showEquation) {
        return {
            ...base,
            2: Constants.damage.base,
            3: Constants.damage.amp,
            4: Constants.cooldown
        }    
    } else {
        return {
            ...base,
            2: Constants.damage,
            3: Constants.cooldown
        }
    }
}

export default values;