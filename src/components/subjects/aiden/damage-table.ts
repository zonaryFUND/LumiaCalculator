import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard", "aiden"],
    skill: [
        [
            {label: "通常Q", skill: "Q", damage: Constants.Q.damage, type: "basic"},
            {label: "ハイパーチャージ中Q", skill: "Q", damage: Constants.Q.range_damage, type: "basic"}
        ],
        [
            {label: "W発動(最小)", skill: "W", damage: Constants.W.damage},
            {label: "W発動(最大)", skill: "W", damage: Constants.W.damage, multiplier: Constants.W.max_multiplier * 100},
            {label: "W電場", skill: "W", damage: Constants.W.field_damage}
        ],
        [
            {label: "E1", skill: "E", damage: Constants.E.damage},
            {label: "E2", skill: "E", damage: Constants.E.rush_damage}
        ],
        [
            {label: "R1外周", skill: "R", damage: Constants.R.first_damage},
            {label: "R1中心", skill: "R", damage: Constants.R.center_damage},
            {label: "R2", skill: "R", damage: Constants.R.second_damage}
        ]
    ]   
} 

export default table;