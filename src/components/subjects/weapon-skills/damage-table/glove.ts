import { SkillValueProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillValueProps[] = [
    {label: "D基礎ダメージ", skill: "D", value: Constants.glove.damage, type: "basic"},
    {label: "D基礎+追加割合ダメージ威力換算値", skill: "D", value: Constants.glove.damage, multiplier: Constants.glove.additional_damage.map(v => v + 100), type: "basic"},
    {label: "D追加固定ダメージ", skill: "D", value: Constants.glove.true_damage, type: "true"}
]

export default table;