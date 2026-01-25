import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = (): TooltipValues => ({
    0: Constants.threshold,
    1: Constants.duration,
    2: Constants.cooldown,
    3: Constants.defense,
    5: Constants.attack,
    6: Constants.omnisyphon
})
export default values;