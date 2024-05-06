import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D", skill: "D", damage: Constants.crossbow.damage},
    {label: "D命中+壁ドン合計", skill: "D", damage: Constants.crossbow.damage, multiplier: 200}
]

export default table;