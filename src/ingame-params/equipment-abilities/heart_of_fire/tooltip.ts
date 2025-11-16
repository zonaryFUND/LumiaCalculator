import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

<<<<<<< HEAD
const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    const base: TooltipValues = {
        0: Constants.tick
    }
    if (showEquation) {
        return {
            ...base,
=======
const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.period,
>>>>>>> recovery-9.0
            1: Constants.damage.base,
            2: Constants.damage.maxHP,
            4: Constants.heal,
            5: Constants.max_heal
        }
    } else {
        return {
<<<<<<< HEAD
            ...base,
=======
            0: Constants.period,
>>>>>>> recovery-9.0
            1: Constants.damage,
            2: Constants.heal,
            3: Constants.max_heal
        }
    }
<<<<<<< HEAD
=======

>>>>>>> recovery-9.0
}

export default values;