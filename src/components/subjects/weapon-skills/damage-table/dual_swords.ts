import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D1", skill: "D", damage: Constants.dual_swords.first_damage},
    {label: `D1全ヒット(${Constants.dual_swords.first_count})`, skill: "D", damage: Constants.dual_swords.first_damage, multiplier: Constants.dual_swords.first_count * 100},
    {label: "D2", skill: "D", damage: Constants.dual_swords.second_damage},
]

export default table;