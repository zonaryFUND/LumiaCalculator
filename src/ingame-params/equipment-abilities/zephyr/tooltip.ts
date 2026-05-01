import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.time_bound,
    1: Constants.threshold,
    2: Constants.cooldown,
    3: Constants.duration,
    4: Constants.ms,
    10: showEquation ? Constants.shield.base : Constants.shield,
    11: Constants.ms,
    13: Constants.shield.level,
    15: RatioPercent(Constants.shield.amp),
    20: Constants.dot_trigger_period
})

export default values;