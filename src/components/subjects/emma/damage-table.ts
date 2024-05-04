import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "Q2ヒット", skill: "Q", damage: Constants.Q.damage, multiplier: 200},
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "鳩R", skill: "R", damage: Constants.R.Q.damage},
            {label: "帽子R", skill: "R", damage: Constants.R.W.damage},
            {label: "兎R", skill: "R", damage: Constants.R.E.damage}
        ],
        [{label: "Tシールド", skill: "T", damage: Constants.T.shield, type: "shield"}]
    ]
}

export default table;