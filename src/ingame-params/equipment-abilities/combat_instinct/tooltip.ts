import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ importedValues }): TooltipValues => {
    if (importedValues?.adaptive) {
        return {
            0: Constants.duration,
            1: importedValues.adaptive,
            2: importedValues.attack_speed,
            3: Constants.cooldown,
            4: Constants.cooldown_reduction,
            5: importedValues.adaptive * 2,
        }
    } else {
        return {
            0: Constants.duration,
            1: importedValues?.attack_speed,
            2: Constants.cooldown,
            3: Constants.cooldown_reduction
        }
    }
    
}

export default values;