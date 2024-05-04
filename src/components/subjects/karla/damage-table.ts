import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        {label: "Q", skill: "Q", damage: Constants.Q.damage, type: "basic"},
        {label: "Q貫通2番目以降", skill: "Q", damage: Constants.Q.second_damage, type: "basic"},
    ],
    skill: [
        [
            {label: "W(スピア1本)", skill: "W", damage: Constants.W.damage},
            {label: "W(スピア2本)", skill: "W", damage: Constants.W.damage, multiplier: 200 - 1 * Constants.W.damage_reduction},
            {label: "W(スピア3本)", skill: "W", damage: Constants.W.damage, multiplier: 300 - 3 * Constants.W.damage_reduction},
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R設置", skill: "R", damage: Constants.R.first_damage},
            {label: "R引張", skill: "R", damage: Constants.R.second_damage}
        ],
        [
            {label: "T非チャージ時基本攻撃", skill: "T", damage: Constants.T.damage},
            {label: "Tチャージ時基本攻撃", skill: "T", damage: Constants.T.full_charge_damage}
        ]
    ]
}

export default table;