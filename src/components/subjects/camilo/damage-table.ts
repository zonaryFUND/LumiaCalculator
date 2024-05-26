import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard"
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage, type: "critical"},
            {label: "Q2初撃", skill: "Q", value: Constants.Q.Q2_first_damage, type: "critical"},
            {label: "Q2追撃", skill: "Q", value: Constants.Q.Q2_second_damage, type: "critical"},
            {label: "Q2回復", skill: "Q", value: Constants.Q.heal, type: "heal"}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage, type: "critical"},
            {label: `W最大ヒット(${Constants.W.count})`, skill: "W", value: Constants.W.damage, type: "critical", multiplier: [{basic: Constants.W.count * 100}]},
        ],
        [
            {label: "Eワンステップ", skill: "E", value: Constants.E.damage},
            {label: "Eツーステップ", skill: "E", value: Constants.E.second_damage},
        ],
        [
            {label: "R1ヒット", skill: "R" as any, value: Constants.R.one_hit_damage},
            {label: "R2ヒット", skill: "R" as any, value: Constants.R.two_hit_damage} as SkillValueProps
        ].concat([...Array(Constants.R.heal.maxHit)].map((_, i) => 
            ({label: `R回復量(${i + 1}ヒット)`, skill: "R", value: Constants.R.heal, type: "heal", multiplier: [{basic: Constants.R.heal.perHit.map(v => v * (i + 1) + 100)}]} as SkillValueProps)
        )),
        [{label: "Tシールド", skill: "T", value: Constants.T.shield, type: "shield"}]
    ]
}

export default table;