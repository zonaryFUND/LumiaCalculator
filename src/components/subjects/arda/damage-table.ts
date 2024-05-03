import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard"
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [
            {label: "W出現時", skill: "W", damage: Constants.W.damage},
            {label: "W消滅時", skill: "W", damage: Constants.W.vanish_damage},
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "RQ文字", skill: "R", damage: Constants.R.Q.damage},
            {label: "RW障壁", skill: "R", damage: Constants.R.W.damage}
        ],
        [{label: "T回復", skill: "T", damage: Constants.T.heal, type: "heal"}]
    ]
}


export default table;