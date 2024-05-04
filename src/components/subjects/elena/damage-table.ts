import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q初撃", skill: "Q", damage: Constants.Q.first_damage},
            {label: "Q追撃", skill: "Q", damage: Constants.Q.second_damage},
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R外周", skill: "R", damage: Constants.R.outer_damage},
            {label: "R中央", skill: "R", damage: Constants.R.center_damage}
        ],
        [{label: "T解除時追加ダメージ", skill: "T", damage: Constants.T.damage}]
    ]
}

export default table;