import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Q中追加ダメージ", skill: "Q", damage: Constants.Q.damage},
        {label: "T突進追加ダメージ", skill: "T", damage: Constants.T.additional_damage}
    ],
    skill: [
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [{label: "R", skill: "R", damage: Constants.R.damage}],
        [{label: "T衝突", skill: "T", damage: Constants.T.damage}]
    ]   
}

export default table;