import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedDamage, importedValues }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return {
        1: sanitizedDamage.base!,
        2: sanitizedDamage.attack!,
        3: sanitizedDamage.level!,
        4: importedValues?.heal,
        5: sanitizedDamage,
        6: sanitizedDamage
    }
}

export default values;