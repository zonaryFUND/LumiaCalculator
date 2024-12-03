import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ importedDamage }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);
    return {
        0: Constants.area,
        1: Constants.area,
        3: RatioPercent(sanitizedDamage.maxHP!),
        4: sanitizedDamage
    }
}

export default values;