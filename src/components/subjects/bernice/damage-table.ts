import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        {label: "通常攻撃T最小", skill: "T", damage: Constants.T.min_damage, type: "basic", disableCritical: true},   
        {label: "通常攻撃T最大", skill: "T", damage: Constants.T.max_damage, type: "basic", disableCritical: true},
        {label: "通常攻撃T致命打追加射撃最小", skill: "T", damage: Constants.T.min_second_damage, type: "basic", disableCritical: true},
        {label: "通常攻撃T致命打追加射撃最大", skill: "T", damage: Constants.T.max_second_damage, type: "basic", disableCritical: true}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "強化Q", skill: "Q", damage: Constants.Q.enhanced_damage}
        ],
        [{label: "W出血固定ダメージ", skill: "W", damage: Constants.W.damage, type: "true"}],
        [
            {label: "R", skill: "R", damage: Constants.R.first_damage},
            {label: "R転移", skill: "R", damage: Constants.R.second_damage}
        ]
    ]   
}

export default table;