import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return FilterUndefined({
        3: showEquation ? sanitizedDamage.level : sanitizedDamage,
        4: Constants.time_bound,
        5: Constants.cooldown,
    })
}

export default values;