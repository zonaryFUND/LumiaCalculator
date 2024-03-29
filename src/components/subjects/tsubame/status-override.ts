import { Status } from "components/subject/status";
import Constants from "./constants.json";

export default function(status: Status): Status {
    const critChance = status.criticalChance.times(Constants.T.attack_per_critical_chance);
    const critDamage = status.criticalDamage.times(Constants.T.attack_per_critical_damage);
    return {
        ...status,
        baseAdditionalAttackPower: status.baseAdditionalAttackPower.add(critChance).add(critDamage)
    };
}