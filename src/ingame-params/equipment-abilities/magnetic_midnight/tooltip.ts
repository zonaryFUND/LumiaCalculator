import Constants from "./constants.json";
import { useValueContextOptional } from "components/tooltip/value-context";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined, RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ importedDamage, importedValues }) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = importedDamage ? SanitizeValueRatio(importedDamage) : undefined;

    return FilterUndefined({
        1: importedValues?.slow.duration,
        2: importedValues?.slow.effect,
        4: importedValues?.slow.duration,
        6: Constants.cooldown,
        7: RatioPercentOptional(sanitizedDamage?.amp),
        8: showEquation ? sanitizedDamage?.level : sanitizedDamage, 
        9: Constants.cooldown,
        10: sanitizedDamage
    })
}

export default values;