import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage }): TooltipValues => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    if (showEquation) {
        return {
            1: RatioPercent(sanitizedDamage.amp!),
            3: RatioPercent(Constants.lifesteal_ratio),
            5: sanitizedDamage.level!,
            6: RatioPercent(sanitizedDamage.targetMaxHP!),
            7: Constants.cooldown,
            8: Constants.max_stack,
            9: Constants.duration
        }
    } else {
        return {
            2: sanitizedDamage,
            4: RatioPercent(Constants.lifesteal_ratio),
            5: RatioPercent(sanitizedDamage.targetMaxHP!),
            6: Constants.cooldown,
            7: Constants.max_stack,
            8: Constants.duration
        }
    }
}

export default values;