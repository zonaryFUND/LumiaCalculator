import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => {
    return {
        0: showEquation ? Constants.first_damage.base : Constants.first_damage,
        1: Constants.first_damage.amp,
        2: Constants.second_damage,
        3: showEquation ? Constants.second_damage.base : Constants.cooldown,
        4: Constants.second_damage.amp,
        5: Constants.cooldown
    }
}

export default values;