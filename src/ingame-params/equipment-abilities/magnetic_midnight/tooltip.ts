import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = damage ? useSanitizedValueRatio(damage) : undefined;

    return {
        1: (values as any).slow.duration,
        2: (values as any).slow.effect,
        4: (values as any).slow.duration,
        6: Constants.cooldown,
        7: `${sanitizedDamage?.amp}%`,
        8: showEquation ? sanitizedDamage?.level as number : sanitizedDamage!, 
        9: Constants.cooldown,
        10: sanitizedDamage!
    }
}

export default values;