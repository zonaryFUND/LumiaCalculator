import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D(スキルダメージ分)", skill: "D", value: Constants.dagger.dagger.damage},
    {label: "D(固定ダメージ分)", skill: "D", value: Constants.dagger.dagger.true_damage, type: "true"}
]

export default table;