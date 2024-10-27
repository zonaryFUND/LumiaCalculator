import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D", skill: "D", value: Constants.axe.damage},
    {label: "D回復", skill: "D", value: Constants.axe.damage, type: {type: "heal", target: "self"}, damageDependent: Constants.axe.heal}
]

export default table;