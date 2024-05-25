import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const maxQ = Constants.Q.duration / Constants.Q.tick + 1;

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: `Q最大ヒット(${maxQ})`, skill: "Q", value: Constants.Q.damage, multiplier: maxQ * 100}
        ],
        [
            {label: "E火炎地帯ダメージ/0.5秒", skill: "E", value: Constants.E.damage}
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage}
        ],
        [
            {label: "T持続ダメージ総量", skill: "T", value: Constants.T.damage}
        ]
    ]
}

export default table;