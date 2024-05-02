import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", damage: Constants.Q.first_damage},
            {label: "Q2", skill: "Q", damage: Constants.Q.second_damage}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "Wシールド", skill: "W", damage: Constants.W.shield.amount, type: "shield"},
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage}
        ],
        [
            {label: "R", skill: "R", damage: Constants.R.damage}
        ]
    ]
}

export default table;