import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => ({
    0: Constants.hp_threshold,
    1: Constants.damage_amp,
    2: Constants.cooldown
})

export default values;