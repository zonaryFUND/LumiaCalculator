import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = () => ({
    0: Constants.spark_max,
    1: Constants.damage, 
    2: Constants.damage.attack,
    3: Constants.cooldown
})

export default values;