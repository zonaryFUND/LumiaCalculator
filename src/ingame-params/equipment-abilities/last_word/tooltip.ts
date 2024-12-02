import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, _) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        1: `${sanitizedDamage.amp}%`,
        2: sanitizedDamage,
        5: (showEquation ? sanitizedDamage.level : sanitizedDamage.targetMaxHP) as number,
        6: sanitizedDamage.targetMaxHP as number
    }
}

export default values;