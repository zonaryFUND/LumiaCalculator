import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ(対象)", skill: "T", value: Constants.T.damage},
        {label: "T追加ダメージ(周囲)", skill: "T", value: Constants.T.aoe_damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "Q(栞あり)", skill: "Q", value: Constants.Q.bookmark_damage}
        ],
        [
            {label: "Wシールド", skill: "W", value: Constants.W.shield, type: "shield"},
            {label: "Wダメージ", skill: "W", value: Constants.W.damage}
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "E(栞あり)", skill: "E", value: Constants.E.bookmark_damage},
            {label: "E回復最小値", skill: "E", value: Constants.E.heal, type: "heal"},
            {label: "E回復最大値", skill: "E", value: Constants.E.heal, type: "heal", multiplier: Constants.E.heal_max_multiplier * 100},
        ],
        [
            {label: "RQ", skill: "R", value: Constants.RQ.damage},
            {label: "RQ(栞あり)", skill: "R", value: Constants.RQ.bookmark_damage}
        ],
        [
            {label: "RWシールド", skill: "R", value: Constants.RW.shield, type: "shield"},
            {label: "RWダメージ", skill: "R", value: Constants.RW.damage}
        ],
        [
            {label: "RE", skill: "R", value: Constants.RE.damage},
            {label: "RE(栞あり)", skill: "R", value: Constants.RE.bookmark_damage},
            {label: "RE回復最小値", skill: "R", value: Constants.RE.heal, type: "heal"},
            {label: "RE回復最大値", skill: "R", value: Constants.RE.heal, type: "heal", multiplier: Constants.RE.heal_max_multiplier * 100},
        ]
    ]   
}

export default table;