import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        1: `${sanitizedDamage.amp}%`,
        2: sanitizedDamage,
        3: values?.heal as number,
        4: values?.heal as number,
        5: sanitizedDamage.targetMaxHP as number,
        6: sanitizedDamage.targetMaxHP as number
    }
}

export default values;