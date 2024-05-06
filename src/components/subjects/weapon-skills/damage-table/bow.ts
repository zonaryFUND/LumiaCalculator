import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D外周", skill: "D", damage: Constants.bow.damage},
    {label: "D中央", skill: "D", damage: Constants.bow.center_damage}
]

export default table;