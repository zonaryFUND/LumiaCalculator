import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D", skill: "D", damage: Constants.spear.damage},
    {label: "D近距離", skill: "D", damage: Constants.spear.damage, multiplier: 200}
]

export default table;