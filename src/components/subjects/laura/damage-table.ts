import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", damage: Constants.Q.Q1_damage},
            {label: "Q2", skill: "Q", damage: Constants.Q.Q2_damage},
            {label: "Q3", skill: "Q", damage: Constants.Q.Q3_first_damage},
            {label: "Q3追撃", skill: "Q", damage: Constants.Q.Q3_second_damage}
        ],
        [
            {label: "W命中", skill: "W", damage: Constants.W.hit_damage},
            {label: "W発動", skill: "W", damage: Constants.W.target_damage}
        ],
        [
            {label: "R衝突", skill: "R", damage: Constants.R.first_damage},
            {label: "R着地", skill: "R", damage: Constants.R.second_damage}
        ]
    ]   
}

export default table;