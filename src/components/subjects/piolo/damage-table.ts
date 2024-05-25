import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const qAll = {
    base: Constants.Q1.damage.base.map((v, i) => v * 7 + Constants.Q1.enhanced_damage.base[i] * 3),
    amp: Constants.Q1.damage.amp * 7 + Constants.Q1.enhanced_damage.amp * 3
}

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "R使用後T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1振り回し基本", skill: "Q", value: Constants.Q1.damage},
            {label: `Q1振り回し強化(${Constants.Q1.enhance.map(v => `${v}`).join(",")}回目)`, skill: "Q", value: Constants.Q1.enhanced_damage},
            {label: "Q1全ヒット", skill: "Q", value: qAll},
            {label: "Q2中央", skill: "Q", value: Constants.Q2.center_damage},
            {label: "Q2外周", skill: "Q", value: Constants.Q2.outer_damage}
        ],
        [{label: "W2", skill: "W", value: Constants.W2.damage}],
        [
            {label: "E1命中最小", skill: "E", value: Constants.E1.first_min_damage},
            {label: "E1命中最大", skill: "E", value: Constants.E1.first_max_damage},
            {label: "E1突進最小", skill: "E", value: Constants.E1.second_min_damage},
            {label: "E1突進最小", skill: "E", value: Constants.E1.second_max_damage},
            {label: "E2", skill: "E", value: Constants.E2.damage}
        ],
        [
            {label: "Rダメージ", skill: "R", value: Constants.R.damage},
            {label: "Rシールド", skill: "R", value: Constants.R.shield, type: "shield"}
        ]

    ]   
}

export default table;