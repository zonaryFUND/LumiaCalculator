import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Q中追加ダメージ", skill: "Q", value: Constants.Q.damage},
        {label: `Q中追加ダメージ全ヒット(${Constants.Q.count})`, skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.count * 100},
        {label: "T突進追加ダメージ", skill: "T", value: Constants.T.additional_damage}
    ],
    skill: [
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: "T衝突", skill: "T", value: Constants.T.damage}]
    ]   
}

export default table;