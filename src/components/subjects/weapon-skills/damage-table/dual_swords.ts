import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D1", skill: "D", value: Constants.dual_swords.first_damage},
    {label: `D1全ヒット(${Constants.dual_swords.first_count})`, skill: "D", value: Constants.dual_swords.first_damage, multiplier: [{basic: Constants.dual_swords.first_count * 100}]},
    {label: "D2", skill: "D", value: Constants.dual_swords.second_damage},
]

export default table;