import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "ニナ基本攻撃", skill: "T", damage: {attack: 100}, type: "summoned"}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [
            {label: "W糸回転固定ダメージ/秒", skill: "W", damage: Constants.W.damage, type: "true"},
            {label: `W糸回転固定ダメージ最大ヒット(${Constants.W.duration})秒`, skill: "W", damage: Constants.W.damage, type: "true", multiplier: Constants.W.duration * 100},
            {label: "W刃ダメージ", skill: "W", damage: Constants.W.drop_damage},
            {label: "Wニナ落下ダメージ", skill: "W", damage: Constants.W.nina_damage}
        ],
        [
            {label: "E1", skill: "E", damage: Constants.E.first_damage},
            {label: "E2", skill: "E", damage: Constants.E.second_damage}
        ],
        [
            {label: "R連結ライン最小固定ダメージ/秒", skill: "R", damage: Constants.R.damage, type: "true"},
            {label: "R連結ライン最大固定ダメージ/秒", skill: "R", damage: Constants.R.damage, multiplier: Constants.R.damage_max_multipler * 100, type: "true"},
        ],
        [{label: "Tニナ突き追加ダメージ", skill: "T", damage: Constants.T.damage}]
    ]
}

export default table;