import { DamageTableUnit } from "app-types/damage-table/unit";
import Constants from "../constants.json";

const table: DamageTableUnit[] = [
    {label: "D", value: Constants.axe.damage},
    {label: "D回復", value: Constants.axe.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.axe.heal}
]

export default table;