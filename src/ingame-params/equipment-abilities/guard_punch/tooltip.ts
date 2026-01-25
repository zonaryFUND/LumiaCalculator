import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.damage.base,
            1: Constants.damage.additionalMaxHP,
            2: Constants.damage.targetMaxHP,
            3: Constants.cooldown,
            4: Constants.slow.duration,
            5: Constants.slow.effect
        }   
    } else {
        return {
            0: Constants.damage,
            1: Constants.damage.targetMaxHP,
            2: Constants.cooldown,
            3: Constants.slow.duration,
            4: Constants.slow.effect
        }
    }
}

export default values;