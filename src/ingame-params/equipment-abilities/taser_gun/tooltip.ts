import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) =>{
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