import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Wスクリーン通過基本攻撃追加ダメージ", skill: "W", value: Constants.W.damage}
    ],
    skill: [
        [
            {label: "Qダメージ", skill: "Q", value: Constants.Q.damage},
            {label: "Q回復", skill: "Q", value: Constants.Q.heal, type: "heal"},
            {label: "Qスクリーンダメージ", skill: "Q", value: Constants.Q.screen_damage},
            {label: "Qスクリーン回復", skill: "Q", value: Constants.Q.screen_heal, type: "heal"}
        ],
        [{label: "E対象追加ダメージ", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: "Tシールド", skill: "T", value: Constants.T.shield, type: "shield"}]
    ]   
}

export default table;