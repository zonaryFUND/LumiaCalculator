import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E後追加ダメージ", skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.damage},
            {label: "Q2", skill: "Q", value: Constants.Q.Q2_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: "強化W", skill: "W", value: Constants.W.enhanced_damage},
        ],
        [{label: "Rロープ衝突1回", skill: "R", value: Constants.R.damage}]
    ]   
}

export default table;