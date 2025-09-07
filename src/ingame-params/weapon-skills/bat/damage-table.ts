import { WeaponSkillDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableUnit[] = [
    {label: "D", value: Constants.damage},
    {label: "D壁ドン", value: Constants.wall_damage}
]

export default table;
