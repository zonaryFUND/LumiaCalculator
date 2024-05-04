import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Q追加ダメージ", skill: "Q", damage: Constants.Q.additional_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [
            {label: "W内周", skill: "W", damage: Constants.W.inner_damage},
            {label: "W外周", skill: "W", damage: Constants.W.outer_damage}
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "E気絶時追加ダメージ", skill: "E", damage: Constants.E.knockback_damage}
        ],
        [
            {label: "R使用・味方蘇生時回復/秒", skill: "R", damage: Constants.R.heal, type: "heal"},
            {label: `R使用・味方蘇生時回復最大(${Constants.R.heal_duration})`, skill: "R", damage: Constants.R.heal, type: "heal", multiplier: Constants.R.heal_duration * 100},
            {label: "R最小ダメージ", skill: "R", damage: Constants.R.min_damage},
            {label: "R最大ダメージ", skill: "R", damage: Constants.R.min_damage, multiplier: Constants.R.max_damage_ratio * 100}
        ],
        [
            {label: "T外傷合計固定ダメージ", skill: "T", damage: Constants.T.wound, type: "true"},
            {label: "T致命的外傷合計固定ダメージ", skill: "T", damage: Constants.T.critical_wound, type: "true"},
            {label: "Tシールド", skill: "T", damage: Constants.T.shield, type: "shield"}
        ]
    ]
}

export default table;