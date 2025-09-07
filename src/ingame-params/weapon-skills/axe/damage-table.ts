import { WeaponSkillDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableUnit[] = [
    {label: "D", value: Constants.damage},
    {label: "D回復", value: Constants.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.heal}
]

export default table;