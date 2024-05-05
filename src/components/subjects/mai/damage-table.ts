import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [
            {label: "Eシールド", skill: "E", damage: Constants.E.shield, type: "shield"},
            {label: "E2", skill: "E", damage: Constants.E.damage}
        ],
        [{label: "R回復", skill: "R", damage: Constants.R.heal, type: "heal"}]
    ]   
}

export default table;