import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q通過", skill: "Q", value: Constants.Q.first_damage},
            {label: "Q着弾", skill: "Q", value: Constants.Q.second_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "Eシールド", skill: "E", value: Constants.E.shield, type: "shield"},
            {label: "Eダメージ", skill: "E", value: Constants.E.damage},
        ],
        [{label: "R", skill: "R", value: {...Constants.R.damage, lostHP: Constants.R.lost_hp_conversion}}]
    ]   
}

export default table;