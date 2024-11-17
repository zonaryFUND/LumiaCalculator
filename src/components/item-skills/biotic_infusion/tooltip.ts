import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useRange from "app-types/subject-dynamic/config/use-range";
import { ValueRatio } from "app-types/value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { config, status } = useValueContextOptional();
    const range = useRange(config)

    return {
        1: `${("melee" in damage! ? damage.melee.targetMaxHP : undefined)}%`, 
        2: damage! as ValueRatio,
        3: `${(damage as ValueRatio).maxHP}%`,
        4: Constants.time_bound,
        5: Constants.cooldown,
        6: range == "melee" ? "近距離" : "遠距離",
        7: `${("melee" in damage! ? damage.range.targetMaxHP : undefined)}%`,
        8: `${(damage as ValueRatio).amp}%`,
        9: (damage as ValueRatio).level as number
    }
}

export default values;