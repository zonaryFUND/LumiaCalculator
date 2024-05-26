import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "W直後基本攻撃(酔い最大)", skill: "W", value: {attack: 100, basicAttackAmp: 100}, type: "basic", multiplier: [{basic: 100 + Constants.W.basic_attack_amp * 100}]},
        {label: "T基本攻撃2撃目", skill: "T", value: Constants.T.damage, type: "basic"}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: `Q最大ヒット${Constants.Q.count}`, skill: "Q", value: Constants.Q.damage, multiplier: [{basic: Constants.Q.count * 100}]},
            {label: "強化Q", skill: "Q", value: Constants.Q.enhanced_damage},
            {label: `強化Q最大ヒット${Constants.Q.count}`, skill: "Q", value: Constants.Q.enhanced_damage, multiplier: [{basic: Constants.Q.count * 100}]}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R1打最小", skill: "R", value: Constants.R.min_damage},
            {label: `R最小全ヒット(${Constants.R.count})`, skill: "R", value: Constants.R.min_damage, multiplier: [{basic: Constants.R.count * 100}]},
            {label: "R1打最大", skill: "R", value: Constants.R.max_damage},
            {label: `R最大全ヒット(${Constants.R.count})`, skill: "R", value: Constants.R.max_damage, multiplier: [{basic: Constants.R.count * 100}]},
        ]
    ]   
}

export default table;