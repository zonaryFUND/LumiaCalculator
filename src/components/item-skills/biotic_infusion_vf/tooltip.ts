import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import { ValueRatio } from "app-types/value-ratio";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        3: showEquation ? sanitizedDamage.level as number : sanitizedDamage,
        4: Constants.time_bound,
        5: Constants.cooldown,
    }
}

export default values;