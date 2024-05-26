import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "ニナ基本攻撃", skill: "T", value: {attack: 100}, type: "summoned"}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: "W糸回転固定ダメージ/秒", skill: "W", value: Constants.W.damage, type: "true"},
            {label: `W糸回転固定ダメージ最大ヒット(${Constants.W.duration})秒`, skill: "W", value: Constants.W.damage, type: "true", multiplier: [{basic: Constants.W.duration * 100}]},
            {label: "W刃ダメージ", skill: "W", value: Constants.W.drop_damage},
            {label: "Wニナ落下ダメージ", skill: "W", value: Constants.W.nina_damage}
        ],
        [
            {label: "E1", skill: "E", value: Constants.E.first_damage},
            {label: "E2", skill: "E", value: Constants.E.second_damage}
        ],
        [
            {label: "R連結ライン最小固定ダメージ/秒", skill: "R", value: Constants.R.damage, type: "true"},
            {label: "R連結ライン最大固定ダメージ/秒", skill: "R", value: Constants.R.damage, multiplier: [{basic: Constants.R.damage_max_multipler * 100}], type: "true"},
        ],
        [{label: "Tニナ突き追加ダメージ", skill: "T", value: Constants.T.damage}]
    ]
}

export default table;