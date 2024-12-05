import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.damage.base,
            1: Constants.damage.attack,
            2: Constants.damage.level,
            3: Constants.defense_down.duration,
            4: Constants.defense_down.effect,
            5: Constants.cooldown
        }
    } else {
        return {
            0: Constants.damage,
            1: Constants.defense_down.duration,
            2: Constants.defense_down.effect,
            3: Constants.cooldown
        }
    }
}

export default values;