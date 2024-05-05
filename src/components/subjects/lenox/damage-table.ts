import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "Q外周", skill: "Q", damage: {...Constants.Q.damage, ...Constants.Q.additional_damage}},
        ],
        [
            {label: "W周囲", skill: "W", damage: Constants.W.first_damage},
            {label: "W引寄", skill: "W", damage: Constants.W.second_damage}
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R1ヒット", skill: "R", damage: Constants.R.damage},
            {label: "R2ヒット", skill: "R", damage: Constants.R.damage, multiplier: 200},
        ],
        [{label: "Tシールド", skill: "T", damage: Constants.T.shield, type: "shield"}]
    ]   
}

export default table;