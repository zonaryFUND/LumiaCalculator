import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) =>{
    return {
        0: Constants.threshold,
        1: showEquation ? Constants.shield.base : Constants.shield,
        2: showEquation ? Constants.shield.base : Constants.max_shield,
        3: Constants.shield.level,
        4: Constants.shield.level,
        5: Constants.max_shield.base,
        6: Constants.max_shield.base,
        7: Constants.max_shield.level,
        8: Constants.max_shield.level,
        13: Constants.max_shield.amp,
        14: Constants.max_shield.amp
    }
}

export default values;