import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D最小値", skill: "D", value: Constants.nunchaku.min_damage},
    {label: "D最大値", skill: "D", value: Constants.nunchaku.max_damage}
]

export default table;