import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const maxRHit = Constants.R.duration / Constants.R.tick;

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: "強化Q", skill: "Q", damage: Constants.Q.damage, multiplier: Constants.Q.additional_damage.map(v => v + 100)}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "強化W", skill: "W", damage: Constants.W.damage, multiplier: Constants.W.additional_damage.map(v => v + 100)},
        ],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "強化E", skill: "E", damage: Constants.E.damage, multiplier: Constants.E.additional_damage.map(v => v + 100)},
        ],
        [
            {label: "R回復", skill: "R", damage: Constants.R.heal, type: "heal"},
            {label: "R", skill: "R", damage: Constants.R.damage},
            {label: `R最大ヒット(${maxRHit})`, skill: "R", damage: Constants.R.damage, multiplier: maxRHit * 100}
        ],
        [
        {   label: "T回復", skill: "T", damage: Constants.T.heal, type: "heal"}
        ]
    ]
}

export default table;