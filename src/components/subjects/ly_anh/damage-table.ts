import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        {label: "人間基本攻撃", skill: "T", value: Constants.LyAnhT.human_basic_attack, type: "basic"},
        {label: "憑依基本攻撃", skill: "T", value: Constants.LyAnhT.possessed_basic_attack, type: "basic"},
        {label: "悪霊基本攻撃", skill: "T", value: Constants.LyAnhT.ghost_basic_attack},
        {label: "憑依/悪霊追加固定ダメージ", skill: "T", value: Constants.LyAnhT.additional_damage, type: "true"},
        {label: "憑依追加ダメージ比例回復", skill: "T", value: Constants.LyAnhT.additional_damage, multiplier: [{basic: Constants.LyAnhT.possesed_heal}], type: "heal"},
        {label: "悪霊追加ダメージ比例回復", skill: "T", value: Constants.LyAnhT.additional_damage, multiplier: [{basic: Constants.LyAnhT.ghost_heal}], type: "heal"}
    ],
    skill: [
        [{label: "人間Q", skill: "Q", value: Constants.LyAnhQ.damage}],
        [{label: "人間W", skill: "W", value: Constants.LyAnhW.damage}],
        [{label: "人間E", skill: "E", value: Constants.LyAnhE.damage}],
        [{label: "憑依Q", skill: "Q", value: Constants.GhostQ.damage}],
        [{label: "憑依W", skill: "W", value: Constants.GhostW.damage}],
        [
            {label: "憑依E振り下ろし", skill: "E", value: Constants.GhostE.first_damage},
            {label: "憑依E引き寄せ", skill: "E", value: Constants.GhostE.second_damage}
        ],
        [
            {label: "R飛び出し", skill: "R", value: Constants.LyAnhR.damage}
        ]
    ]    
}


export default table;