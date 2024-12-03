import Constants from "./constants.json";
import { useValueContextOptional } from "components/tooltip/value-context";
import SanitizeValueRatio from "../use-sanitize-value-ratio";
import { useIntl } from "react-intl";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage, importedValues }) => {
    const sanitizedDamage = SanitizeValueRatio(importedDamage);

    const meleeMessage = {
        intlID: "Item/Skills/6007000/Melee",
        values: {
            0: importedValues?.slow.duration,
            1: RatioPercent(importedValues?.slow.effect)
        }
    }

    return {
        0: Constants.max_stack,
        1: showEquation ? Constants.distance_per_stack : Constants.max_stack,
        2: Constants.distance_per_stack,
        3: Constants.ms,
        4: Constants.ms,
        6: sanitizedDamage.base!,
        7: sanitizedDamage.base!,
        9: meleeMessage,
        10: importedValues?.slow.effect,
        11: importedValues?.slow.duration
    }
}

export default values;