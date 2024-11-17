import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useRange from "app-types/subject-dynamic/config/use-range";

const values: ItemSkillTooltipValuesHook = (damage, _) => {
    const { config, showEquation } = useValueContextOptional();
    const range = useRange(config);
    const rangeDependentDamage = (() => {
        if ("melee" in damage! && "range" in damage!) {
            return damage![range];
        }

        throw new Error("electric shock tooltip needs its damage to be range-dependent value.");
    })();

    const levelProp = (rangeDependentDamage as any).levelProp;
    const level = (levelProp.to - levelProp.to) / 19;
    const levelFixed = {
        targetMaxHP: rangeDependentDamage.targetMaxHP,
        base: levelProp.from - level,
        level
    };

    return {
        0: Constants.max_stack,
        1: `${(showEquation ? damage.melee.targetMaxHP : levelFixed.targetMaxHP)}%`,
        4: (damage.melee as any).levelProp.from,
        5: (damage.melee as any).levelProp.to,
        6: showEquation ? `${damage.range.targetMaxHP}%` : levelFixed,
        7: Constants.duration,
        9: (damage.range as any).levelProp.from,
        10: (damage.range as any).levelProp.to,
        11: Constants.duration
    }
}

export default values;