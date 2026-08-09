import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.max_target,
    1: showEquation ? Constants.damage.attack : Constants.damage
})

export default values;