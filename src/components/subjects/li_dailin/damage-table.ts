import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "W直後基本攻撃(酔い最大)", skill: "W", damage: {attack: 100, basicAttackAmp: 100}, type: "basic", multiplier: 100 + Constants.W.basic_attack_amp * 100},
        {label: "T基本攻撃2撃目", skill: "T", damage: Constants.T.damage, type: "basic"}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: `Q最大ヒット${Constants.Q.count}`, skill: "Q", damage: Constants.Q.damage, multiplier: Constants.Q.count * 100},
            {label: "強化Q", skill: "Q", damage: Constants.Q.enhanced_damage},
            {label: `強化Q最大ヒット${Constants.Q.count}`, skill: "Q", damage: Constants.Q.enhanced_damage, multiplier: Constants.Q.count * 100}
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R1打最小", skill: "R", damage: Constants.R.min_damage},
            {label: `R最小全ヒット(${Constants.R.count})`, skill: "R", damage: Constants.R.min_damage, multiplier: Constants.R.count * 100},
            {label: "R1打最大", skill: "R", damage: Constants.R.max_damage},
            {label: `R最大全ヒット(${Constants.R.count})`, skill: "R", damage: Constants.R.max_damage, multiplier: Constants.R.count * 100},
        ]
    ]   
}

export default table;