import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined, RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config, importedDamage, importedValues }) => {
    const range = weaponRangeOf(config);
    const rangeDependentDamage = (() => {
        if (importedDamage != undefined && "melee" in importedDamage) {
            return importedDamage[range];
        }

        throw new Error("circulation tooltip needs its damage to be range-dependent value.");
    })();

    return FilterUndefined({
        3: importedValues?.as,
        8: Constants.duration,
        10: importedDamage.melee.base,
        11: showEquation ? RatioPercentOptional(importedDamage.melee.amp) : rangeDependentDamage,
        12: RatioPercentOptional(importedDamage.range.amp)
    })
}

export default values;