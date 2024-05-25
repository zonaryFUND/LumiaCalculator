import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R鞄振回し", skill: "R", value: Constants.R.damage},
            {label: "R短剣", skill: "R", value: Constants.R.knife_damage}
        ],
        [{label: "T短剣投げ", skill: "T", value: Constants.T.knife_damage}]
    ]   
}

export default table;