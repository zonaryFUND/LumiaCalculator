import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const maxW2 = Constants.W2.duration / Constants.W2.tick;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Q追加ダメージ", skill: "Q", value: Constants.Q.damage}
    ],
    skill: [
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "E中W", skill: "W", value: Constants.W2.damage},
            {label: `E中W全ヒット(${maxW2})`, skill: "W", value: Constants.W2.damage, multiplier: [{basic: maxW2 * 100}]},
        ],
        [{label: "E2", skill: "E", value: Constants.E2.damage}],
        [
            {label: "R自己シールド", skill: "R", value: Constants.R.self.shield, type: "shield"},
            {label: "R自己使用時ダメージ", skill: "R", value: Constants.R.self.damage},
            {label: "R味方シールド", skill: "R", value: Constants.R.ally.shield, type: "shield"},
            {label: "R味方使用時ダメージ", skill: "R", value: Constants.R.ally.damage}
        ],
        [{label: "T追加回復", skill: "T", value: Constants.T.additional_heal, type: "heal"}]
    ]
}

export default table;