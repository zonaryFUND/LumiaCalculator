import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ(対象)", skill: "T", damage: Constants.T.damage},
        {label: "T追加ダメージ(周囲)", skill: "T", damage: Constants.T.aoe_damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "Q(栞あり)", skill: "Q", damage: Constants.Q.bookmark_damage}
        ],
        [
            {label: "Wシールド", skill: "W", damage: Constants.W.shield, type: "shield"},
            {label: "Wダメージ", skill: "W", damage: Constants.W.damage}
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "E(栞あり)", skill: "E", damage: Constants.E.bookmark_damage},
            {label: "E回復最小値", skill: "E", damage: Constants.E.heal, type: "heal"},
            {label: "E回復最大値", skill: "E", damage: Constants.E.heal, type: "heal", multiplier: Constants.E.heal_max_multiplier * 100},
        ],
        [
            {label: "RQ", skill: "R", damage: Constants.RQ.damage},
            {label: "RQ(栞あり)", skill: "R", damage: Constants.RQ.bookmark_damage}
        ],
        [
            {label: "RWシールド", skill: "R", damage: Constants.RW.shield, type: "shield"},
            {label: "RWダメージ", skill: "R", damage: Constants.RW.damage}
        ],
        [
            {label: "RE", skill: "R", damage: Constants.RE.damage},
            {label: "RE(栞あり)", skill: "R", damage: Constants.RE.bookmark_damage},
            {label: "RE回復最小値", skill: "R", damage: Constants.RE.heal, type: "heal"},
            {label: "RE回復最大値", skill: "R", damage: Constants.RE.heal, type: "heal", multiplier: Constants.RE.heal_max_multiplier * 100},
        ]
    ]   
}

export default table;