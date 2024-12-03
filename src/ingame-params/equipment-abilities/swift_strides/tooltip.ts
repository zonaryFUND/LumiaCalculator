import Constants from "./constants.json";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined, RatioPercent, RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config, importedDamage, importedValues }) => {
    const range = weaponRange(config);
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    const meleeMessage = {
        intlID: "Item/Skills/6007000/Melee",
        values: FilterUndefined({
            0: importedValues?.slow?.duration,
            1: RatioPercentOptional(importedValues?.slow?.effect)
        })
    }

    return FilterUndefined({
        0: Constants.max_stack,
        1: showEquation ? importedValues?.tick : Constants.max_stack,
        2: importedValues?.tick,
        3: importedValues?.ms,
        4: importedValues?.ms,
        6: sanitizedDamage.base,
        7: sanitizedDamage.base,
        9: range == "melee" ? meleeMessage : "",
        10: RatioPercentOptional(importedValues?.slow?.effect),
        11: importedValues?.slow?.duration
    })
}

export default values;