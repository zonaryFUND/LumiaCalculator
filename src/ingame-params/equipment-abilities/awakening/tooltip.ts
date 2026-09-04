import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) => ({
    0: Constants.duration,
    1: importedValues?.attackSpeed ?? importedValues?.penetrationDefenseRatio,
    2: importedValues?.moveSpeed,
    3: Constants.cooldown
})

export default values;