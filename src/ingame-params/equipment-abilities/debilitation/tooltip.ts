import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ config, status, importedDamage }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);
    const targetMaxHP = sanitizedDamage.targetMaxHP as ValueRatio;

    return FilterUndefined({
        0: targetMaxHP.base,
        1: targetMaxHP.amp,
        2: Constants.duration,
        3: Constants.max_stack,
        4: calculateValue(targetMaxHP, status, config).static.toFixed(1)
    })
}

export default values;