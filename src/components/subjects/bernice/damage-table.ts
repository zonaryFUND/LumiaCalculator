import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        {label: "通常攻撃T最小", skill: "T", value: Constants.T.min_damage, type: "basic"},   
        {label: "通常攻撃T最大", skill: "T", value: Constants.T.max_damage, type: "basic"},
        {label: "通常攻撃T致命打追加射撃最小", skill: "T", value: Constants.T.min_second_damage, type: "basic"},
        {label: "通常攻撃T致命打追加射撃最大", skill: "T", value: Constants.T.max_second_damage, type: "basic"}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "強化Q", skill: "Q", value: Constants.Q.enhanced_damage}
        ],
        [{label: "W出血固定ダメージ", skill: "W", value: Constants.W.damage, type: "true"}],
        [
            {label: "R", skill: "R", value: Constants.R.first_damage},
            {label: "R転移", skill: "R", value: Constants.R.second_damage}
        ]
    ]   
}

export default table;