import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard"
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage, type: "critical"},
            {label: "Q2初撃", skill: "Q", damage: Constants.Q.Q2_first_damage, type: "critical"},
            {label: "Q2追撃", skill: "Q", damage: Constants.Q.Q2_second_damage, type: "critical"},
            {label: "Q2回復", skill: "Q", damage: Constants.Q.heal, type: "heal"}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage, type: "critical"},
            {label: `W最大ヒット(${Constants.W.count})`, skill: "W", damage: Constants.W.damage, type: "critical", multiplier: Constants.W.count * 100},
        ],
        [
            {label: "Eワンステップ", skill: "E", damage: Constants.E.damage},
            {label: "Eツーステップ", skill: "E", damage: Constants.E.second_damage},
        ],
        [
            {label: "R1ヒット", skill: "R" as any, damage: Constants.R.one_hit_damage},
            {label: "R2ヒット", skill: "R" as any, damage: Constants.R.two_hit_damage} as SkillDamageProps
        ].concat([...Array(Constants.R.heal.maxHit)].map((_, i) => 
            ({label: `R回復量(${i + 1}ヒット)`, skill: "R", damage: Constants.R.heal, type: "heal", multiplier: Constants.R.heal.perHit.map(v => v * (i + 1) + 100)} as SkillDamageProps)
        )),
        [{label: "Tシールド", skill: "T", damage: Constants.T.shield, type: "shield"}]
    ]
}

export default table;