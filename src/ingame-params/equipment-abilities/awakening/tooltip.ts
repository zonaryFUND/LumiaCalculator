import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) => ({
    0: Constants.duration,
    1: importedValues?.as ?? importedValues?.penetration,
    2: importedValues?.ms,
    3: Constants.cooldown
})

export default values;