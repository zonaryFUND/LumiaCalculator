import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E追加ダメージ", skill: "T", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1ヒット", skill: "Q", value: Constants.Q.damage},
            {label: `Q全ヒット${Constants.Q.count}`, skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.count * 100}
        ],
        [
            {label: "W1", skill: "W", value: Constants.W.first_damage},
            {label: "W2", skill: "W", value: Constants.W.second_damage}
        ],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: "T死の演技復活後回復", skill: "T", value: Constants.T.hp, type: "heal"}]
    ]   
}

export default table;