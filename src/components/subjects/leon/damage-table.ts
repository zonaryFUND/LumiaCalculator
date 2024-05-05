import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "Wシールド", skill: "W", damage: Constants.W.shield, type: "shield"}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R波ダメージ", skill: "R", damage: Constants.R.damage},
            {label: "R壁ドンダメージ", skill: "R", damage: Constants.R.wall_damage}
        ]
    ]   
}

export default table;