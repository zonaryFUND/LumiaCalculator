import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const maxQ = Constants.Q.duration / Constants.Q.tick;

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", damage: Constants.Q.damage},
            {label: `Q最大ヒット(${maxQ})`, skill: "Q", damage: Constants.Q.damage, multiplier: maxQ * 100}
        ],
        [
            {label: "E火炎地帯ダメージ/0.5秒", skill: "E", damage: Constants.E.damage}
        ],
        [
            {label: "R", skill: "R", damage: Constants.R.damage}
        ],
        [
            {label: "T持続ダメージ総量", skill: "T", damage: Constants.T.damage}
        ]
    ]
}

export default table;