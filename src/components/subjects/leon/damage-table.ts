import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "Wシールド", skill: "W", value: Constants.W.shield, type: "shield"}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R波ダメージ", skill: "R", value: Constants.R.damage},
            {label: "R壁ドンダメージ", skill: "R", value: Constants.R.wall_damage}
        ]
    ]   
}

export default table;