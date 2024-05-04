import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E追加ダメージ", skill: "T", damage: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1ヒット", skill: "Q", damage: Constants.Q.damage},
            {label: `Q全ヒット${Constants.Q.count}`, skill: "Q", damage: Constants.Q.damage, multiplier: Constants.Q.count * 100}
        ],
        [
            {label: "W1", skill: "W", damage: Constants.W.first_damage},
            {label: "W2", skill: "W", damage: Constants.W.second_damage}
        ],
        [{label: "R", skill: "R", damage: Constants.R.damage}],
        [{label: "T死の演技復活後回復", skill: "T", damage: Constants.T.hp, type: "heal"}]
    ]   
}

export default table;