import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useRange from "app-types/subject-dynamic/config/use-range";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { config } = useValueContextOptional();
    const range = useRange(config);
    const rangeDependentDamage = (() => {
        if ("melee" in damage! && "range" in damage!) {
            return damage![range];
        }

        throw new Error("flame barrior tooltip needs its damage to be range-dependent value.");
    })();

    return {
        0: range == "melee" ? "近距離" : "遠距離",
        1: Constants.area,
        3: `${damage.melee.maxHP}%`,
        4: rangeDependentDamage,
        7: `${damage.range.maxHP}%`
    }
}

export default values;