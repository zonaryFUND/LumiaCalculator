import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R発動時周囲", skill: "R", value: Constants.R.first_damage},
            {label: "R札", skill: "R", value: Constants.R.card_damage},
            {label: "R札全ヒット(5)", skill: "R", value: Constants.R.card_damage, multiplier: [{basic: 500}]}
        ],
        [{label: "T追加ダメージ", skill: "T", value: Constants.T.damage}]
    ]   
}

export default table;