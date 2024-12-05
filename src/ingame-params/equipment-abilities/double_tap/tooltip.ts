import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined, RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage, importedValues }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return FilterUndefined({
        1: RatioPercentOptional(sanitizedDamage.amp),
        2: sanitizedDamage,
        3: importedValues?.heal,
        4: importedValues?.heal,
        5: showEquation ? sanitizedDamage.level : sanitizedDamage.targetMaxHP,
        6: sanitizedDamage.targetMaxHP
    })
}

export default values;