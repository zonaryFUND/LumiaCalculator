import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useRange from "app-types/subject-dynamic/config/use-range";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { config, showEquation } = useValueContextOptional();
    const range = useRange(config);
    const rangeDependentDamage = (() => {
        if ("melee" in damage! && "range" in damage!) {
            return damage![range];
        }

        throw new Error("circulation tooltip needs its damage to be range-dependent value.");
    })();

    return {
        3: values?.as as number,
        8: Constants.duration,
        10: damage!.melee.base as number,
        11: showEquation ? `${damage!.melee.amp}%` : rangeDependentDamage,
        12: `${damage!.range.amp}%`
    }
}

export default values;