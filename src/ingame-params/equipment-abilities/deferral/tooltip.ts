import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config }): TooltipValues => {
    const range = weaponRange(config);

    if (showEquation) {
        return {
            0: Constants.melee,
            1: Constants.range,
            2: Constants.duration
        }
    } else {
        return {
            0: Constants[range],
            2: Constants.duration
        }
    }
}

export default values;