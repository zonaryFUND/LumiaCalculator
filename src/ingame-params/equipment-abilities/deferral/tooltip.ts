import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = () => ({
    0: RatioPercent(Constants.attack_speed),
    1: Constants.max_stack,
    2: Constants.duration
})

export default values;