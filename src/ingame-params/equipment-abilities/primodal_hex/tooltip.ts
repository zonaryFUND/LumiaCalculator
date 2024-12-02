import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        0: sanitizedDamage.base as number,
        1: showEquation ? `${sanitizedDamage.amp}%` : sanitizedDamage,
        2: Constants.duration,
        3: Constants.duration,
        4: Constants.immune,
        5: Constants.immune,
    }
}

export default values;