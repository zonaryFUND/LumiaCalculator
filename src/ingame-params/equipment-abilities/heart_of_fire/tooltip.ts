import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    const base: TooltipValues = {
        0: Constants.tick
    }
    if (showEquation) {
        return {
            ...base,
            1: Constants.damage.base,
            2: Constants.damage.maxHP,
            4: Constants.heal,
            5: Constants.max_heal
        }
    } else {
        return {
            ...base,
            1: Constants.damage,
            2: Constants.heal,
            3: Constants.max_heal
        }
    }
}

export default values;