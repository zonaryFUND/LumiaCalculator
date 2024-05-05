import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R鞄振回し", skill: "R", damage: Constants.R.damage},
            {label: "R短剣", skill: "R", damage: Constants.R.knife_damage}
        ],
        [{label: "T短剣投げ", skill: "T", damage: Constants.T.knife_damage}]
    ]   
}

export default table;