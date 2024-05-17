import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Wスクリーン通過基本攻撃追加ダメージ", skill: "W", damage: Constants.W.damage}
    ],
    skill: [
        [
            {label: "Qダメージ", skill: "Q", damage: Constants.Q.damage},
            {label: "Q回復", skill: "Q", damage: Constants.Q.heal, type: "heal"},
            {label: "Qスクリーンダメージ", skill: "Q", damage: Constants.Q.screen_damage},
            {label: "Qスクリーン回復", skill: "Q", damage: Constants.Q.screen_heal, type: "heal"}
        ],
        [{label: "E対象追加ダメージ", skill: "E", damage: Constants.E.damage}],
        [{label: "R", skill: "R", damage: Constants.R.damage}],
        [{label: "Tシールド", skill: "T", damage: Constants.T.shield, type: "shield"}]
    ]   
}

export default table;