import { EquipmentAbilityTooltipValues } from "../type";
import SanitizeValueRatio from "../use-sanitize-value-ratio";

const values: EquipmentAbilityTooltipValues = ({ importedDamage, importedValues }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return {
        0: sanitizedDamage?.targetHP!,
        1: sanitizedDamage?.targetHP!,
        3: importedValues?.as,
        5: importedValues?.max.ad,
        6: importedValues?.max.ms,
        8: importedValues?.duration,
        9: importedValues?.stack
    }
}

export default values;