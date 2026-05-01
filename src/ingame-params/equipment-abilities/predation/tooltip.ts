import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    const base: TooltipValues = {
        0: Constants.range,
        1: Constants.threshold
    }
    if (showEquation) {
        return {
            ...base,
            2: Constants.damage.base,
            3: Constants.damage.additionalMaxHp,
            4: Constants.heal.base,
            5: Constants.heal.additionalMaxHp,
            6: Constants.heal.lostHP,
            7: Constants.movement_speed.duration,
            8: Constants.movement_speed.effect,
            9: Constants.cooldown
        }
    } else {
        return {
            ...base,
            2: Constants.damage,
            3: Constants.heal,
            4: Constants.heal.lostHP,
            5: Constants.movement_speed.duration,
            6: Constants.movement_speed.effect,
            7: Constants.cooldown
        }
    }
}

export default values;