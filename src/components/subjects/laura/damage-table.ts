import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.Q1_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.Q2_damage},
            {label: "Q3", skill: "Q", value: Constants.Q.Q3_first_damage},
            {label: "Q3追撃", skill: "Q", value: Constants.Q.Q3_second_damage}
        ],
        [
            {label: "W命中", skill: "W", value: Constants.W.hit_damage},
            {label: "W発動", skill: "W", value: Constants.W.target_damage}
        ],
        [
            {label: "R衝突", skill: "R", value: Constants.R.first_damage},
            {label: "R着地", skill: "R", value: Constants.R.second_damage}
        ]
    ]   
}

export default table;