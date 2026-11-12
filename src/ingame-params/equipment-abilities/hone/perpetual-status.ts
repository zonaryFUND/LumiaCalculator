import Constants from "./constants.json";
import { EquipmentAbilityPerpetualStatus } from "../type";
import { Status } from "core/subject-dynamic/status/type";
import Decimal from "decimal.js";

export function AdditionalCooldownReduction(status: Status): Decimal {
    return status.attackPower.additionalValue.percent(Constants.cooldown_reduction.additionalAttack).floor();
}

const f: EquipmentAbilityPerpetualStatus = () => ({
    cooldownReduction: [{
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "item-skill.hone",
        value: {
            type: "status-conversion",
            func: AdditionalCooldownReduction
        }
    }]
})

export default f;