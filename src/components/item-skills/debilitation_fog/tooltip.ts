import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = () => {
    const { showEquation } = useValueContextOptional();

    return {
        0: Constants.duration,
        1: Constants.defense_down,
        2: showEquation ? Constants.damage.base : Constants.damage,
        3: Constants.damage.additionalMaxHP,
        4: Constants.cooldown
    }
}

export default values;