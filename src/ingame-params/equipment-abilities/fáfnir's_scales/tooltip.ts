import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    const base = {
        0: Constants.damage_per_stack,
        1: Constants.duration,
        2: Constants.max_stack,
        3: Constants.defense_per_stack,
        4: Constants.shield.duration
    }

    if (showEquation) {
        return {
            ...base,
            5: Constants.shield.effect.base,
            6: Constants.shield.effect.additionalMaxHP,
            7: Constants.movement_speed
        }
    } else {
        return {
            ...base,
            5: Constants.shield.effect,
            6: Constants.movement_speed
        }
    }
}

export default values;