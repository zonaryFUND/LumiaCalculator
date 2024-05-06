import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D", skill: "D", damage: Constants.whip.damage},
    {label: "D2ヒット", skill: "D", damage: Constants.whip.damage, multiplier: 200}
]

export default table;