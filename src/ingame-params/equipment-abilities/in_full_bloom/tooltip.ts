import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.damage.base,
    1: Constants.damage.level,
    4: Constants.cooldown,
    5: Constants.damage
})

export default values;