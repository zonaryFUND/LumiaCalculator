import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R発動時周囲", skill: "R", damage: Constants.R.first_damage},
            {label: "R札", skill: "R", damage: Constants.R.card_damage},
            {label: "R札全ヒット(5)", skill: "R", damage: Constants.R.card_damage, multiplier: 500}
        ],
        [{label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}]
    ]   
}

export default table;