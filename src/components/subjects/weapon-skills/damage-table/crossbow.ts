import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D", skill: "D", value: Constants.crossbow.damage},
    {label: "D命中+壁ドン合計", skill: "D", value: Constants.crossbow.damage, multiplier: [{basic: 200}]}
]

export default table;