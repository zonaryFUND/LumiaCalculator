import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) =>{
    const base: TooltipValues = {
        0: Constants.duration
    }

    if (showEquation) {
        return {
            ...base,
            1: Constants.damage.base,
            2: Constants.damage.level,
            3: Constants.damage.targetMaxHp,
            4: Constants.cooldown
        }
    } else {
        return {
            ...base,
            1: Constants.damage.base,
            2: Constants.damage.targetMaxHp,
            3: Constants.cooldown
        }

    }


}

export default values;