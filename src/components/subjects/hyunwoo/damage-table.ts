import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard"
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W防御力増加", skill: "W", damage: Constants.W.defense, type: "true"}],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "E壁ドン追加ダメージ", skill: "E", damage: Constants.E.wall_damage}
        ],
        [
            {label: "R最小", skill: "R", damage: Constants.R.min_damage},
            {label: "R最大", skill: "R", damage: Constants.R.max_damage}
        ],
        [
            {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage},
            {label: "T回復", skill: "T", damage: Constants.T.heal, type: "heal"}
        ]
    ]   
}

export default table;