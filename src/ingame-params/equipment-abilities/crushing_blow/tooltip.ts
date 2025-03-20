import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ importedDamage, importedValues, showEquation }): TooltipValues => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return {
        0: Constants.cooldown,
        1: showEquation ? sanitizedDamage.base! : sanitizedDamage,
        2: showEquation ? sanitizedDamage.additionalMaxHP : importedValues!.heal,
        3: sanitizedDamage.level!,
        4: importedValues!.heal.base,
        5: importedValues!.heal.additionalMaxHP
    }
}

export default values;