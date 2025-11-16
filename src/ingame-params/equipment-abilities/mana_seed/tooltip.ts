import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => ({
    0: Constants.amp_per_stack,
    1: Constants.cooldown,
    2: Constants.stack_gain_on_time_pass,
    3: Constants.max_stack,
    4: Constants.cooldown_reduction,
    5: 0
})

export default values;