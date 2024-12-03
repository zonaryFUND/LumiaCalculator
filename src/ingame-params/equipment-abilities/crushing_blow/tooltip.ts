import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.cooldown,
    1: showEquation ? Constants.damage.base : Constants.damage,
    2: showEquation ? Constants.damage.additionalMaxHP : Constants.heal,
    3: Constants.damage.level,
    4: Constants.heal.base,
    5: Constants.heal.additionalMaxHP
})

export default values;