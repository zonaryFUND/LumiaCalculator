import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = () => {
    const { showEquation } = useValueContextOptional();

    return {
        0: Constants.duration,
        1: showEquation ? Constants.adaptive.base : Constants.adaptive,
        2: showEquation ? Constants.adaptive.level : Constants.as,
        3: Constants.as
    }
}

export default values;