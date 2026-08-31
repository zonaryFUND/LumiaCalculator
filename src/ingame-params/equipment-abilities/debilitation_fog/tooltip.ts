import Constants from "./constants";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.duration,
    1: Constants.defenseDown,
    2: showEquation ? Constants.damage.base : Constants.damage,
    3: Constants.damage.additionalMaxHP,
    4: Constants.cooldown
})

export default values;