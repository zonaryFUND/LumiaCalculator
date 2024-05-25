import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T基本攻撃2撃目", skill: "T", value: Constants.T.damage, type: "basic"}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "強化Q", skill: "Q", value: Constants.Q.enhanced_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: "強化W", skill: "W", value: Constants.W.enhanced_damage}
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "強化E", skill: "E", value: Constants.E.enhanced_damage}
        ],
        [
            {label: "R最小", skill: "R", value: Constants.R.min_damage},
            {label: "R最大", skill: "R", value: Constants.R.max_damage}
        ],
        [
            {label: "Tシールド最小(スタックなし)", skill: "T", value: Constants.T.shield.effect, type: "shield"},
            {label: `Tシールド最大(${Constants.T.max_stack}スタック)`, skill: "T", value: {...Constants.T.shield.effect, base: Constants.T.max_stack * Constants.T.shield.effect.consumedStack}, type: "shield"},
        ]
    ]   
}

export default table;