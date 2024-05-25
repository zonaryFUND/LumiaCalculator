import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D", skill: "D", value: Constants.arcana.damage},
    {label: `D全ヒット(${Constants.arcana.count})`, skill: "D", value: Constants.arcana.damage, multiplier: Constants.arcana.count * 100}
]

export default table;