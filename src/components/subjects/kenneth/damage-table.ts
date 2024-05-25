import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E使用後追加ダメージ", skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "Q(T最大スタック時)", skill: "Q", value: Constants.Q.damage, multiplier: 100 + Constants.Q.max_stack_damage}
        ],
        [
            //{label: "W被ダメージ減少量", skill: "W", value: Constants.W.damage_reduction, type: "kenneth"},
            {label: "W被ダメージ減少量", skill: "W", value: Constants.W.damage_reduction},
            {label: "Wシールド", skill: "W", value: Constants.W.shield, type: "shield"}
        ],
        [
            {label: "R振り上げ", skill: "R", value: Constants.R.first_damage},
            {label: "R空中2連撃1ヒット", skill: "R", value: Constants.R.second_damage},
            {label: "R空中2連撃2ヒット", skill: "R", value: Constants.R.second_damage, multiplier: 200},
            {label: "R振り下ろし", skill: "R", value: Constants.R.third_damage}
        ],
        [
            {label: "T追加ダメージ", skill: "T", value: Constants.T.damage},
            {label: "E効果中T固定ダメージ転換量", skill: "T", value: Constants.T.damage, multiplier: Constants.E.damage_conversion, type: "true"},
            //{label: "T追加ダメージ比回復量", skill: "T", value: Constants.T.heal, type: "kenneth"}
            {label: "T追加ダメージ比回復量", skill: "T", value: Constants.T.heal}
        ]
    ]
}

export default table;