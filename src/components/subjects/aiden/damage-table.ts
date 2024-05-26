import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "通常Q", skill: "Q", value: Constants.Q.damage, type: "basic"},
            {label: "ハイパーチャージ中Q", skill: "Q", value: Constants.Q.range_damage, type: "basic"}
        ],
        [
            {label: "W発動(最小)", skill: "W", value: Constants.W.damage},
            {label: "W発動(最大)", skill: "W", value: Constants.W.damage, multiplier: [{basic: Constants.W.max_multiplier * 100}]},
            {label: "W電場", skill: "W", value: Constants.W.field_damage}
        ],
        [
            {label: "E1", skill: "E", value: Constants.E.damage},
            {label: "E2", skill: "E", value: Constants.E.rush_damage}
        ],
        [
            {label: "R1外周", skill: "R", value: Constants.R.first_damage},
            {label: "R1中心", skill: "R", value: Constants.R.center_damage},
            {label: "R2", skill: "R", value: Constants.R.second_damage}
        ]
    ]   
} 

export default table;