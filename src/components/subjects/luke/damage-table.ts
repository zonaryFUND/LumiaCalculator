import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "W中追加ダメージ", skill: "W", value: Constants.W.basic_attack_damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.first_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.second_damage},
            {label: "進化Q2最大値", skill: "Q", value: Constants.Q.second_damage, multiplier: Constants.Q.enhance_max + 100}
        ],
        [{label: "W発動", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R最小", skill: "R", value: Constants.R.damage},
            {label: "R最大", skill: "R", value: Constants.R.damage, multiplier: Constants.R.max_multiplier * 100}
        ]
    ]   
}

export default table;