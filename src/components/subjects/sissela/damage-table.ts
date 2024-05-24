import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q通過", skill: "Q", damage: Constants.Q.first_damage},
            {label: "Q着弾", skill: "Q", damage: Constants.Q.second_damage}
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [
            {label: "Eシールド", skill: "E", damage: Constants.E.shield, type: "shield"},
            {label: "Eダメージ", skill: "E", damage: Constants.E.damage},
        ],
        [{label: "R", skill: "R", damage: {...Constants.R.damage, lostHP: Constants.R.lost_hp_conversion}}]
    ]   
}

export default table;