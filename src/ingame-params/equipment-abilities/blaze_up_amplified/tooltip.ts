import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ importedValues }) => ({
    0: Constants.skill_damage,
    1: importedValues?.moveSpeed ?? importedValues?.lifeSteal,
    2: Constants.max_stack,
    3: Constants.duration,
    20: Constants.dot_period
})

export default values;