import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) =>{
    return {
        0: showEquation ? Constants.shield.base : Constants.shield,
        1: Constants.duration,
        2: showEquation ? 0 : Constants.threshold,
        3: showEquation ? Constants.duration : Constants.enhance,
        4: showEquation ? Constants.threshold : Constants.cooldown,
        5: Constants.enhance,
        6: Constants.cooldown,
        7: Constants.shield.maxHP
    }
}

export default values;