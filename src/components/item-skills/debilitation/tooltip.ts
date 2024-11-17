import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = (damage, _) => {
    const { config, status } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);
    const targetMaxHP = sanitizedDamage.targetMaxHP as ValueRatio;

    return {
        0: targetMaxHP.base as number,
        1: targetMaxHP.amp as number,
        2: Constants.duration,
        3: Constants.max_stack,
        4: calculateValue(sanitizedDamage, status!, config!).dynamic?.targetMaxHP?.toFixed(1) ?? ""
    }
}

export default values;