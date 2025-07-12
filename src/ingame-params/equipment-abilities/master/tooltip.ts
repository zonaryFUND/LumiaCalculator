import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import SanitizeValueRatio from "../use-sanitize-value-ratio";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage }): TooltipValues => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);
    if (showEquation) {
        return {
            0: Constants.time,
            1: sanitizedDamage.base!,
            2: sanitizedDamage.attack!,
            3: sanitizedDamage.amp!,
            5: sanitizedDamage.level!,
            6: Constants.slow.duration,
            7: Constants.slow.effect,
            8: Constants.cooldown
        }
    } else {
        return {
            0: Constants.time,
            1: sanitizedDamage,
            2: Constants.slow.duration,
            3: Constants.slow.effect
        }
    }
}

export default values;