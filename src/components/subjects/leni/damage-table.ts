import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Qダメージ", skill: "Q", value: Constants.Q.damage},
            {label: "Q回復", skill: "Q", value: Constants.Q.heal, type: "heal"},
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "Eダメージ", skill: "E", value: Constants.E.damage},
            {label: "Eシールド", skill: "E", value: Constants.E.shield, type: "shield"}
        ],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: "T追加ダメージ", skill: "T", value: Constants.T.damage}]
    ]   
}

export default table;