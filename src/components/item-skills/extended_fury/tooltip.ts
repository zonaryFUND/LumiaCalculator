import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        0: Constants.cooldown,
        1: values?.extend as number,
        2: showEquation ? sanitizedDamage.level as number : sanitizedDamage,
        3: Constants.max_range
    }
}

export default values;