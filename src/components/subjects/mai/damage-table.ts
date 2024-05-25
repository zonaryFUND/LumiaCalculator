import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "Eシールド", skill: "E", value: Constants.E.shield, type: "shield"},
            {label: "E2", skill: "E", value: Constants.E.damage}
        ],
        [{label: "R回復", skill: "R", value: Constants.R.heal, type: "heal"}]
    ]   
}

export default table;