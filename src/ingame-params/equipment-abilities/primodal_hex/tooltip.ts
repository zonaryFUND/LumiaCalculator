import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return {
        0: sanitizedDamage.base!,
        1: showEquation ? RatioPercent(sanitizedDamage.amp!) : sanitizedDamage,
        2: Constants.duration,
        3: Constants.duration,
        4: Constants.immune,
        5: Constants.immune,
    }
}

export default values;