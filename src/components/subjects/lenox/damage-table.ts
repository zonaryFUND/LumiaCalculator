import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "Q外周", skill: "Q", value: {...Constants.Q.damage, ...Constants.Q.additional_damage}},
        ],
        [
            {label: "W周囲", skill: "W", value: Constants.W.first_damage},
            {label: "W引寄", skill: "W", value: Constants.W.second_damage}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R1ヒット", skill: "R", value: Constants.R.damage},
            {label: "R2ヒット", skill: "R", value: Constants.R.damage, multiplier: 200},
        ],
        [{label: "Tシールド", skill: "T", value: Constants.T.shield, type: "shield"}]
    ]   
}

export default table;