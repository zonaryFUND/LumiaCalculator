import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.dmg.base,
    2: Constants.slow.effect,
    4: Constants.slow.duration,
    6: Constants.cooldown,
    9: Constants.cooldown
})

export default values;