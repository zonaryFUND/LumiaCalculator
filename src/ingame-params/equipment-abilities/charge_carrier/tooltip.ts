import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) => {
    return FilterUndefined({
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: Constants.time_bound,
        5: Constants.movement_speed,
        10: importedValues?.shield
    })
}

export default values;