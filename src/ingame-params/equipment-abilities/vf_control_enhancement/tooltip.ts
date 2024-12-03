import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = () => ({
    0: RatioPercent(Constants.cooldown_reduction[0]),
    1: RatioPercent(Constants.cooldown_reduction[1]),
    2: RatioPercent(Constants.cooldown_reduction[2]),
    3: RatioPercent(Constants.cooldown_reduction[3])
})

export default values;