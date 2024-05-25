import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D", skill: "D", value: Constants.whip.damage},
    {label: "D2ヒット", skill: "D", value: Constants.whip.damage, multiplier: 200}
]

export default table;