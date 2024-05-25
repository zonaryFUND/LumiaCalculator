import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D", skill: "D", value: Constants.spear.damage},
    {label: "D近距離", skill: "D", value: Constants.spear.damage, multiplier: 200}
]

export default table;