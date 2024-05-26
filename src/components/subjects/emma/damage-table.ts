import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "Q2ヒット", skill: "Q", value: Constants.Q.damage, multiplier: [{basic: 200}]},
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "鳩R", skill: "R", value: Constants.R.Q.damage},
            {label: "帽子R", skill: "R", value: Constants.R.W.damage},
            {label: "兎R", skill: "R", value: Constants.R.E.damage}
        ],
        [{label: "Tシールド", skill: "T", value: Constants.T.shield, type: "shield"}]
    ]
}

export default table;