import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const rSet = {
    base: Constants.R.damage.base.map((d, i) => d * Constants.R.max_stack + Constants.R.stack_damage.base[i]),
    amp: Constants.R.damage.amp * Constants.R.max_stack + Constants.R.stack_damage.amp
}

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q通過", skill: "Q", damage: Constants.Q.first_damage},
            {label: "Q爆発", skill: "Q", damage: Constants.Q.second_damage},
        ],
        [
            {label: "W発生", skill: "W", damage: Constants.W.first_damage},
            {label: "W爆発", skill: "W", damage: Constants.W.second_damage},
        ],
        [{label: "E効果中追加ダメージ", skill: "E", damage: Constants.E.damage}],
        [   
            {label: "R基本", skill: "R", damage: Constants.R.damage},
            {label: `R${Constants.R.max_stack}スタック時追加ダメージ`, skill: "R", damage: Constants.R.stack_damage},
            {label: `R1セット${Constants.R.max_stack}ティック/${Constants.R.max_stack * Constants.R.tick}秒`, skill: "R", damage: rSet}
        ]
    ]
}

export default table;