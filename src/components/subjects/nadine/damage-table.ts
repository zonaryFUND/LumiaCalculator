import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: `R中追加ダメージ/${Constants.R.count}回`, skill: "R", value: Constants.R.damage}
    ],
    skill: [
        [
            {label: "Q最小", skill: "Q", value: Constants.Q.min_damage},
            {label: "Q最大", skill: "Q", value: Constants.Q.max_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}]
    ]   
}

export default table;