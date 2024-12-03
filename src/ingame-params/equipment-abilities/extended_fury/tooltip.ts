import Constants from "./constants.json";
import { useValueContextOptional } from "components/tooltip/value-context";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedDamage, importedValues }) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    return {
        0: Constants.cooldown,
        1: importedValues?.extend as number,
        2: showEquation ? sanitizedDamage.level! : sanitizedDamage,
        3: Constants.max_range
    }
}

export default values;