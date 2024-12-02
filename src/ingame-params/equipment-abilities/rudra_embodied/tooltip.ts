import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { showEquation } = useValueContextOptional();

    return {
        0: Constants.time_bound,
        1: Constants.threshold,
        2: Constants.cooldown,
        3: Constants.duration,
        4: values?.ms as number,
        11: showEquation ? values?.ad as number : values?.ms as number,
        13: values?.ad as number
    }
}

export default values;