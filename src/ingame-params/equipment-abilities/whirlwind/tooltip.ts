import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    return {
        0: Constants.time_bound,
        2: showEquation ? Constants.damage.base : Constants.damage,
        3: showEquation ? Constants.damage.amp : Constants.damage.targetMaxHP,
        4: Constants.duration,
        5: showEquation ? Constants.damage.targetMaxHP : Constants.cooldown,
        6: showEquation ? Constants.duration : Constants.tick,
        7: Constants.cooldown,
        8: Constants.tick,
    }
}

export default values;