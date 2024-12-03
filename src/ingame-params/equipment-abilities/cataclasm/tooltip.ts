import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.duration,
    1: showEquation ? Constants.damage.base : Constants.damage,
    2: showEquation ? Constants.damage.level : Constants.cooldown,
    3: Constants.damage.amp,
    4: Constants.cooldown
})

export default values;