import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "満開Q", skill: "Q", damage: Constants.Q.bloomed_damage}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "満開Wシールド", skill: "W", damage: Constants.W.shield, type: "shield"}
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "E2ヒット", skill: "E", damage: Constants.E.damage, multiplier: 200},
            {label: "E3ヒット", skill: "E", damage: Constants.E.damage, multiplier: 300}
        ],
        [
            {label: "R往路(中→外)", skill: "R", damage: Constants.R.first_damage},
            {label: "R復路(外→中)", skill: "R", damage: Constants.R.echo_damage},
            {label: "R実回復量", skill: "R", damage: Constants.R.heal}
        ]
    ]   
}

export default table;