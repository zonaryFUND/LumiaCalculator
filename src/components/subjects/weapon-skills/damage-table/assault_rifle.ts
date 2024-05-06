import { SkillDamageProps } from "../../damage-table";
import Constants from "../constants.json";

const table: SkillDamageProps[] = [
    {label: "D基本攻撃追加ダメージ最大値", skill: "D", damage: {base: Constants.assault_rifle.max_stack.map(v => Constants.assault_rifle.per_stack.basic_attack_addition * v)}, type: "true"}
]

export default table;