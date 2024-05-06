import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D(スキルダメージ分)", skill: "D", damage: Constants.dagger.dagger.damage},
    {label: "D(固定ダメージ分)", skill: "D", damage: Constants.dagger.dagger.true_damage, type: "true"}
]

export default table;