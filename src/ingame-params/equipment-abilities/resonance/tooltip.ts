import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: showEquation ? Constants.damage.base : Constants.damage,
    1: Constants.damage.level
})

export default values;