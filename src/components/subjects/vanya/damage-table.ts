import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.basic_attack_damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "Q往復ヒット", skill: "Q", value: Constants.Q.damage, multiplier: [{basic: 200}]},
        ],
        [
            {label: "W1", skill: "W", value: Constants.W.first_damage},
            {label: `W1最大ヒット(${Constants.W.count})`, skill: "W", value: Constants.W.first_damage, multiplier: [{basic: Constants.W.count}]},
            {label: "W2", skill: "W", value: Constants.W.second_damage}
        ],
        [
            {label: "E中心", skill: "E", value: Constants.E.inner_damage},
            {label: "E外周", skill: "E", value: Constants.E.outer_damage}
        ],
        [
            {label: "R命中", skill: "R", value: Constants.R.damage},
            {label: "R目覚まし", skill: "R", value: Constants.R.wakeup_damage}
        ],
        [
            {label: "T持続ダメージ", skill: "T", value: Constants.T.damage_over_time},
            {label: "Tシールド1発動分", skill: "T", value: Constants.T.shield, type: "shield"},
            {label: "Tシールド減少量/秒", skill: "T", value: Constants.T.shield_decline, type: "shield"},
            {label: "Tシールド最大値", skill: "T", value: Constants.T.max_shield, type: "shield"}
        ]
    ]   
}

export default table;