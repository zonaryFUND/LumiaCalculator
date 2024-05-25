import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Qダメージ", skill: "Q", value: Constants.Q.damage},
            {label: "Q回復", skill: "Q", value: Constants.Q.heal, type: "heal"},
            {label: "強化Qダメージ", skill: "Q", value: Constants.Q.enhanced_damage},
            {label: "強化Q回復", skill: "Q", value: Constants.Q.enhanced_heal}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R発動ダメージ", skill: "R", value: Constants.R.damage},
            {label: "R発動時回復", skill: "R", value: Constants.R.heal, type: "heal"},
            {label: "R継続回復/秒", skill: "R", value: Constants.R.heal_per_sec, type: "heal"},
            {label: `R継続回復全ヒット(${Constants.R.duration})秒`, skill: "R", value: Constants.R.heal_per_sec, type: "heal", multiplier: Constants.R.duration * 100}
        ]
    ]   
}

export default table;