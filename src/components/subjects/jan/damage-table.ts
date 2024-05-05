import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "E後追加ダメージ", skill: "E", damage: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", damage: Constants.Q.damage},
            {label: "Q2", skill: "Q", damage: Constants.Q.Q2_damage}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "強化W", skill: "W", damage: Constants.W.enhanced_damage},
        ],
        [{label: "Rロープ衝突1回", skill: "R", damage: Constants.R.damage}]
    ]   
}

export default table;