import { WeaponSkillDamageTableGenerator } from "@app/ingame-params/weapon-skills/type";
import Constants from "./constants.json";

const table: WeaponSkillDamageTableGenerator = props => [
    {label: "D1", value: Constants.first_damage},
    {label: "D2", value: Constants.second_damage}
]

export default table;