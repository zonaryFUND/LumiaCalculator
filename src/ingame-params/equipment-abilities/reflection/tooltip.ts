import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage, importedValues }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage!);

    return {
        3: RatioPercent(Constants.healing_reduction.effect),
        4: RatioPercent(importedValues?.ratio),
        5: showEquation ? RatioPercent(Constants.healing_reduction.effect) : Constants.healing_reduction.duration,
        6: showEquation ? RatioPercent(importedValues?.ratio) : sanitizedDamage.base!,
        7: Constants.threshold,
        8: Constants.healing_reduction.duration,
        9: sanitizedDamage.base!,
        10: Constants.threshold
    }
}

export default values;