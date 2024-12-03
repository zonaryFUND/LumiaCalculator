import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.duration,
    1: RatioPercent(Constants.armor),
    2: Constants.max_stack
})

export default values;