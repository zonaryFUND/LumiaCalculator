import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage }) =>{
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return {
        2: RatioPercent(sanitizedDamage.targetMaxHP!),
        4: Constants.max_stack,
        6: showEquation ? Constants.max_stack : Constants.duration,
        8: Constants.duration
    }
}

export default values;