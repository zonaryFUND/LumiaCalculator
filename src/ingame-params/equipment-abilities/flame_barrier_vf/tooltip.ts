import Constants from "./constants.json";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";
import { ItemSkillTooltipValuesHook } from "../item-skill";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const sanitizedDamage = useSanitizedValueRatio(damage!);
    return {
        0: Constants.area,
        1: Constants.area,
        3: `${sanitizedDamage.maxHP}%`,
        4: sanitizedDamage
    }
}

export default values;