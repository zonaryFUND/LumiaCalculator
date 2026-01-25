import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: Constants.penetration,
    2: Constants.additional_credit,
    3: Constants.movement_speed_up.duration,
    4: Constants.movement_speed_up.effect,
    5: Constants.cooldown,
    6: 0,
    7: Constants.time_bound,
    8: Constants.count
})
export default values;