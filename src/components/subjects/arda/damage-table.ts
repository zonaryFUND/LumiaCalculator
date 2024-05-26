import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard"
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: "W出現時", skill: "W", value: Constants.W.damage},
            {label: "W消滅時", skill: "W", value: Constants.W.vanish_damage},
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "RQ文字", skill: "R", value: Constants.R.Q.damage},
            {label: "RW障壁", skill: "R", value: Constants.R.W.damage},
            {label: "RW障壁全ヒット(4)", skill: "R", value: Constants.R.W.damage, multiplier: [{basic: 400}]},
            {label: "RW内部全ヒット(4)", skill: "R", value: Constants.W.damage, multiplier: [{basic: 400}]}
        ],
        [{label: "T回復", skill: "T", value: Constants.T.heal, type: "heal"}]
    ]
}


export default table;