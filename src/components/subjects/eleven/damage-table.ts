import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const maxRHit = Constants.R.duration / Constants.R.tick + 1;

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "強化Q", skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.additional_damage.map(v => v + 100)}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: "強化W", skill: "W", value: Constants.W.damage, multiplier: Constants.W.additional_damage.map(v => v + 100)},
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "強化E", skill: "E", value: Constants.E.damage, multiplier: Constants.E.additional_damage.map(v => v + 100)},
        ],
        [
            {label: "R回復", skill: "R", value: Constants.R.heal, type: "heal"},
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: `R最大ヒット(${maxRHit})`, skill: "R", value: Constants.R.damage, multiplier: maxRHit * 100}
        ],
        [
        {   label: "T回復", skill: "T", value: Constants.T.heal, type: "heal"}
        ]
    ]
}

export default table;