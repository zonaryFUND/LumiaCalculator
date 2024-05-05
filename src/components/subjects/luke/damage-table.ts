import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "W中追加ダメージ", skill: "W", damage: Constants.W.basic_attack_damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", damage: Constants.Q.first_damage},
            {label: "Q2", skill: "Q", damage: Constants.Q.second_damage},
            {label: "進化Q2最大値", skill: "Q", damage: Constants.Q.second_damage, multiplier: Constants.Q.enhance_max + 100}
        ],
        [{label: "W発動", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R最小", skill: "R", damage: Constants.R.damage},
            {label: "R最大", skill: "R", damage: Constants.R.damage, multiplier: Constants.R.max_multiplier * 100}
        ]
    ]   
}

export default table;