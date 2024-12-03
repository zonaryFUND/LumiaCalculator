import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.duration,
    1: Constants.defense_down,
    2: showEquation ? Constants.damage.base : Constants.damage,
    3: Constants.damage.additionalMaxHP,
    4: Constants.cooldown
})

export default values;