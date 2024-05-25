import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T短気状態追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1最小", skill: "Q", value: Constants.Q.min_damage},
            {label: "Q1最大", skill: "Q", value: Constants.Q.max_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.q2_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "強化E", skill: "E", value: Constants.E.e2_damage},
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: "強化R", skill: "R", value: Constants.R.enhanced_damage}
        ]
    ]   
}

export default table;