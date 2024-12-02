import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { config, showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        3: `${Constants["healing-reduction"].effect}%`,
        4: `${values?.ratio}%`,
        5: showEquation ? `${Constants["healing-reduction"].effect}%` : Constants["healing-reduction"].duration,
        6: showEquation ? `${values?.ratio}%` : sanitizedDamage.base as number,
        7: Constants.threshold,
        8: Constants["healing-reduction"].duration,
        9: sanitizedDamage.base as number,
        10: Constants.threshold
    }
}

export default values;