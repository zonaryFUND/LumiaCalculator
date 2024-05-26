import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const wMax = Constants.W.max_duration / Constants.W.heal_tick;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q通過", skill: "Q", value: Constants.Q.first_damage},
            {label: "Q血の槍", skill: "Q", value: Constants.Q.second_damage}
        ],
        [
            {label: "W回復/0.5秒", skill: "W", value: Constants.W.heal, type: "heal"},
            {label: "W回復最長時間合計", skill: "W", value: Constants.W.heal, type: "heal", multiplier: [{basic: wMax * 100}]},
            {label: "W最大強化回復/0.5秒", skill: "W", value: Constants.W.heal, type: "heal", multiplier: [{basic: Constants.W.enhanced_heal_ratio * 100}]},
            {label: "W最大強化回復最長時間合計", skill: "W", value: Constants.W.heal, type: "heal", multiplier: [{basic: Constants.W.enhanced_heal_ratio * wMax * 100}] }
        ],
        [
            {label: "E最小", skill: "E", value: Constants.E.min_damage},
            {label: "E最大", skill: "E", value: Constants.E.max_damage},
            {label: "E回復", skill: "E", value: Constants.E.heal, type: "heal"}
        ],
        [
            {label: "R発生", skill: "R", value: Constants.R.first_damage},
            {label: "R終了最小", skill: "R", value: Constants.R.min_damage},
            {label: "R終了最大", skill: "R", value: Constants.R.max_damage},
            {label: "R回復基礎値", skill: "R", value: Constants.R.heal}
        ]
    ]   
}

export default table;