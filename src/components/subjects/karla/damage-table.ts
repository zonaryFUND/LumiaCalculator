import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        {label: "Q", skill: "Q", value: Constants.Q.damage, type: "basic"},
        {label: "Q貫通2番目以降", skill: "Q", value: Constants.Q.second_damage, type: "basic"},
    ],
    skill: [
        [
            {label: "W(スピア1本)", skill: "W", value: Constants.W.damage},
            {label: "W(スピア2本)", skill: "W", value: Constants.W.damage, multiplier: 200 - 1 * Constants.W.damage_reduction},
            {label: "W(スピア3本)", skill: "W", value: Constants.W.damage, multiplier: 300 - 3 * Constants.W.damage_reduction},
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R設置", skill: "R", value: Constants.R.first_damage},
            {label: "R引張", skill: "R", value: Constants.R.second_damage}
        ],
        [
            {label: "T非チャージ時基本攻撃", skill: "T", value: Constants.T.damage},
            {label: "Tチャージ時基本攻撃", skill: "T", value: Constants.T.full_charge_damage}
        ]
    ]
}

export default table;