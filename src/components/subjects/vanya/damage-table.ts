import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.basic_attack_damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "Q往復ヒット", skill: "Q", damage: Constants.Q.damage, multiplier: 200},
        ],
        [
            {label: "W1", skill: "W", damage: Constants.W.first_damage},
            {label: `W1最大ヒット(${Constants.W.count})`, skill: "W", damage: Constants.W.first_damage, multiplier: Constants.W.count},
            {label: "W2", skill: "W", damage: Constants.W.second_damage}
        ],
        [
            {label: "E中心", skill: "E", damage: Constants.E.inner_damage},
            {label: "E外周", skill: "E", damage: Constants.E.outer_damage}
        ],
        [
            {label: "R命中", skill: "R", damage: Constants.R.damage},
            {label: "R目覚まし", skill: "R", damage: Constants.R.wakeup_damage}
        ],
        [
            {label: "T持続ダメージ", skill: "T", damage: Constants.T.damage_over_time},
            {label: "Tシールド1発動分", skill: "T", damage: Constants.T.shield, type: "shield"},
            {label: "Tシールド減少量/秒", skill: "T", damage: Constants.T.shield_decline, type: "shield"},
            {label: "Tシールド最大値", skill: "T", damage: Constants.T.max_shield, type: "shield"}
        ]
    ]   
}

export default table;