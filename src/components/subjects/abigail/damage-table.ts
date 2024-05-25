import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.first_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.second_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: "Wシールド", skill: "W", value: Constants.W.shield.amount, type: "shield"},
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage}
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage}
        ]
    ]
}

export default table;