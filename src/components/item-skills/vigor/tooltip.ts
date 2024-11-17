import { ItemSkillTooltipValuesHook } from "../item-skill";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const sanitizedDamage = damage ? useSanitizedValueRatio(damage) : undefined;

    return {
        0: sanitizedDamage?.targetHP as number,
        1: sanitizedDamage?.targetHP as number,
        3: values?.as as number,
        5: (values as any).max.ad,
        6: (values as any).max.ms,
        8: values?.duration as number,
        9: values?.stack as number
    }
}

export default values;