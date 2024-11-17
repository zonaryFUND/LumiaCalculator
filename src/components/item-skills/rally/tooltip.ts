import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = () => {
    const { showEquation } = useValueContextOptional();
    return {
        2: showEquation ? Constants.damage.base : Constants.damage,
        3: Constants.damage.targetMaxHP,
        4: showEquation ? Constants.damage.attack : Constants.duration,
        5: showEquation ? Constants.damage.targetMaxHP : Constants.cooldown,
        6: showEquation ? Constants.duration : Constants.tick,
        7: Constants.cooldown,
        8: Constants.tick
    }
}

export default values;