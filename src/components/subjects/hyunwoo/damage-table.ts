import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard"
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W防御力増加", skill: "W", value: Constants.W.defense, type: "true"}],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "E壁ドン追加ダメージ", skill: "E", value: Constants.E.wall_damage}
        ],
        [
            {label: "R最小", skill: "R", value: Constants.R.min_damage},
            {label: "R最大", skill: "R", value: Constants.R.max_damage}
        ],
        [
            {label: "T追加ダメージ", skill: "T", value: Constants.T.damage},
            {label: "T回復", skill: "T", value: Constants.T.heal, type: "heal"}
        ]
    ]   
}

export default table;