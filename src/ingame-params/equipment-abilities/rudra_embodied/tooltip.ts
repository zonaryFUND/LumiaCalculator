import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedValues }) => {
    return {
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: importedValues?.ms,
        11: showEquation ? importedValues?.ad : importedValues?.ms,
        13: importedValues?.ad
    }
}

export default values;