import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.hp_threshold,
    1: RatioPercent(Constants.damage_amp)
})

export default values;