import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, _) =>{
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        2: `${sanitizedDamage.targetMaxHP}%`,
        4: Constants.max_stack,
        6: showEquation ? Constants.max_stack : Constants.duration,
        8: Constants.duration
    }
}

export default values;