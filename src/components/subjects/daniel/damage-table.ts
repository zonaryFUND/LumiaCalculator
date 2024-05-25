import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E後追加ダメージ", skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "Q中心", skill: "Q", value: Constants.Q.center_damage},
        ],
        [{label: "W爆発基礎値", skill: "W", value: Constants.W.damage}],
        [
            {label: "R潜入中", skill: "R", value: Constants.R.damage},
            {label: `R潜入中全ヒット(${Constants.R.damage_count})`, skill: "R", value: Constants.R.damage, multiplier: Constants.R.damage_count * 100},
            {label: "R最終最小", skill: "R", value: Constants.R.finish_damage},
            {label: "R最終最大", skill: "R", value: Constants.R.finish_damage, multiplier: Constants.R.finish_multiplier_max}
        ]
    ]   
}

export default table;