import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D基礎ダメージ", skill: "D", damage: Constants.glove.damage, type: "basic", disableCritical: true},
    {label: "D基礎+追加割合ダメージ威力換算値", skill: "D", damage: Constants.glove.damage, multiplier: Constants.glove.additional_damage.map(v => v + 100), type: "basic", disableCritical: true},
    {label: "D追加固定ダメージ", skill: "D", damage: Constants.glove.true_damage, type: "true"}
]

export default table;