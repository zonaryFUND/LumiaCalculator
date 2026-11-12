import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { AdditionalCooldownReduction } from "./perpetual-status";

const values: EquipmentAbilityTooltipValues = ({ showEquation, status }) => ({
    0: showEquation ? Constants.cooldown_reduction.additionalAttack : AdditionalCooldownReduction(status).toNumber()
})

export default values;