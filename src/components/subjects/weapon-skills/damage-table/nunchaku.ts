import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D最小値", skill: "D", damage: Constants.nunchaku.min_damage},
    {label: "D最大値", skill: "D", damage: Constants.nunchaku.max_damage}
]

export default table;