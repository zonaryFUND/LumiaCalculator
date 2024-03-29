import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";

export default function(status: StatusProps): StatusProps {
    const critChance = status.criticalChance.times(Constants.T.attack_per_critical_chance);
    const critDamage = status.criticalDamage.times(Constants.T.attack_per_critical_damage);
    return {
        ...status,
        baseAdditionalAttackPower: status.baseAdditionalAttackPower.add(critChance).add(critDamage),
        basicAttackRange: new Decimal(Constants.T.range)
    };
}