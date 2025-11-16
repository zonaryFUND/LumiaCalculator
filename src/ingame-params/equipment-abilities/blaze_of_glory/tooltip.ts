import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
<<<<<<< HEAD

const values: EquipmentAbilityTooltipValues = () => ({
=======
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation }): TooltipValues => ({
>>>>>>> recovery-9.0
    0: Constants.threshold,
    1: Constants.damage_amp,
    2: Constants.cooldown
})

export default values;