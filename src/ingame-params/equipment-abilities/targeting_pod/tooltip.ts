import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = () =>{
    const { showEquation } = useValueContextOptional();
    return {
        0: Constants.duration,
        1: showEquation ? Constants.damage.base : Constants.damage,
        2: showEquation ? Constants.damage.level : Constants.heal,
        3: showEquation ? Constants.heal.base : Constants.cooldown,
        4: Constants.heal.level,
        5: Constants.cooldown
    }
}

export default values;