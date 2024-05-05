import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: `R中追加ダメージ/${Constants.R.count}回`, skill: "R", damage: Constants.R.damage}
    ],
    skill: [
        [
            {label: "Q最小", skill: "Q", damage: Constants.Q.min_damage},
            {label: "Q最大", skill: "Q", damage: Constants.Q.max_damage}
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}]
    ]   
}

export default table;