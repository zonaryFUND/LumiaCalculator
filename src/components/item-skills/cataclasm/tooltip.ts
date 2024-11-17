import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = () => {
    const { showEquation } = useValueContextOptional();

    return {
        0: Constants.duration,
        1: showEquation ? Constants.damage.base : Constants.damage,
        2: showEquation ? Constants.damage.level : Constants.cooldown,
        3: Constants.damage.amp,
        4: Constants.cooldown
    }
}

export default values;