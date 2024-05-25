import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q初撃", skill: "Q", value: Constants.Q.first_damage},
            {label: "Q追撃", skill: "Q", value: Constants.Q.second_damage},
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R外周", skill: "R", value: Constants.R.outer_damage},
            {label: "R中央", skill: "R", value: Constants.R.center_damage}
        ],
        [{label: "T解除時追加ダメージ", skill: "T", value: Constants.T.damage}]
    ]
}

export default table;