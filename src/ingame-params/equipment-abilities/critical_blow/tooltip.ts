import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";

const values: EquipmentAbilityTooltipValues = ({ showEquation }) => ({
    0: showEquation ? Constants.damage.attack : Constants.damage,
    1: showEquation ? Constants.heal.base : Constants.heal,
    2: showEquation ? Constants.heal.attack : Constants.heal.lostHP,
    3: showEquation ? Constants.heal.lostHP : Constants.overheal_duration,
    4: showEquation ? Constants.overheal_duration : Constants.cooldown,
    5: Constants.cooldown
})

export default values;