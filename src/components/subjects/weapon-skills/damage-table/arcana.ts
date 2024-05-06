import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D", skill: "D", damage: Constants.arcana.damage},
    {label: `D全ヒット(${Constants.arcana.count})`, skill: "D", damage: Constants.arcana.damage, multiplier: Constants.arcana.count * 100}
]

export default table;