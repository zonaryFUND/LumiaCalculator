import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const values: ItemSkillTooltipValuesHook = () =>{
    const { showEquation } = useValueContextOptional();
    return {
        2: showEquation ? Constants.damage.base : Constants.damage,
        3: Constants.skill_damage_enhance.duration,
        4: showEquation ? Constants.damage.amp : Constants.skill_damage_enhance.effect,
        5: showEquation ? Constants.skill_damage_enhance.duration : Constants.cooldown,
        6: Constants.skill_damage_enhance.effect,
        7: Constants.cooldown
    }
}

export default values;