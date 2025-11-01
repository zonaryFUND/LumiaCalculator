import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.period,
            1: Constants.damage.base,
            2: Constants.damage.maxHP,
            4: Constants.heal,
            5: Constants.max_heal
        }
    } else {
        return {
            0: Constants.period,
            1: Constants.damage,
            2: Constants.heal,
            3: Constants.max_heal
        }
    }

}

export default values;