import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.duration,
    1: showEquation ? Constants.adaptive.base : Constants.adaptive,
    2: showEquation ? Constants.adaptive.level : Constants.as,
    3: Constants.as
})

export default values;