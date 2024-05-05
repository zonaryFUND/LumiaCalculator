import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Qダメージ", skill: "Q", damage: Constants.Q.damage},
            {label: "Q回復", skill: "Q", damage: Constants.Q.heal, type: "heal"},
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [
            {label: "Eダメージ", skill: "E", damage: Constants.E.damage},
            {label: "Eシールド", skill: "E", damage: Constants.E.shield, type: "shield"}
        ],
        [{label: "R", skill: "R", damage: Constants.R.damage}],
        [{label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}]
    ]   
}

export default table;