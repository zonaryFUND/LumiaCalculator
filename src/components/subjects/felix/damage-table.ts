import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T基本攻撃2撃目", skill: "T", damage: Constants.T.damage, type: "basic"}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "強化Q", skill: "Q", damage: Constants.Q.enhanced_damage}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "強化W", skill: "W", damage: Constants.W.enhanced_damage}
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "強化E", skill: "E", damage: Constants.E.enhanced_damage}
        ],
        [
            {label: "R最小", skill: "R", damage: Constants.R.min_damage},
            {label: "R最大", skill: "R", damage: Constants.R.max_damage}
        ],
        [
            {label: "Tシールド最小(スタックなし)", skill: "T", damage: Constants.T.shield.effect, type: "shield"},
            {label: `Tシールド最大(${Constants.T.max_stack}スタック)`, skill: "T", damage: {...Constants.T.shield.effect, base: Constants.T.max_stack * Constants.T.shield.effect.consumedStack}, type: "shield"},
        ]
    ]   
}

export default table;