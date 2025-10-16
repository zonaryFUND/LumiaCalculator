import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.amp_per_stack,
    1: Constants.cooldown,
    2: Constants.time_pass_stack_gain,
    3: Constants.max_stack,
    4: RatioPercent(Constants.cooldown_reduction),
    5: 0 // buff stack is controlled on another way
})

export default values;