import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E後追加ダメージ", skill: "E", damage: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "Q中心", skill: "Q", damage: Constants.Q.center_damage},
        ],
        [{label: "W爆発基礎値", skill: "W", damage: Constants.W.damage}],
        [
            {label: "R潜入中", skill: "R", damage: Constants.R.damage},
            {label: `R潜入中全ヒット(${Constants.R.damage_count})`, skill: "R", damage: Constants.R.damage, multiplier: Constants.R.damage_count * 100},
            {label: "R最終最小", skill: "R", damage: Constants.R.finish_damage},
            {label: "R最終最大", skill: "R", damage: Constants.R.finish_damage, multiplier: Constants.R.finish_multiplier_max}
        ]
    ]   
}

export default table;