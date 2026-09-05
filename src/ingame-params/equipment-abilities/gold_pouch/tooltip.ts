import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: Constants.range,
    2: Constants.bear,
    3: Constants.wolf,
    4: Constants.hound_boar_crow,
    5: Constants.chick_bat,
    6: Constants.credits_for_1_attack,
    7: Constants.attack_per_credit_unit
})

export default values;