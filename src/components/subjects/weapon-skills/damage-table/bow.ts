import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D外周", skill: "D", value: Constants.bow.damage},
    {label: "D中央", skill: "D", value: Constants.bow.center_damage}
]

export default table;