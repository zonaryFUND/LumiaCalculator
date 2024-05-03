import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        {label: "人間基本攻撃", skill: "T", damage: Constants.LyAnhT.human_basic_attack, type: "basic"},
        {label: "憑依基本攻撃", skill: "T", damage: Constants.LyAnhT.possessed_basic_attack, type: "basic"},
        {label: "悪霊基本攻撃", skill: "T", damage: Constants.LyAnhT.ghost_basic_attack},
        {label: "憑依/悪霊追加固定ダメージ", skill: "T", damage: Constants.LyAnhT.additional_damage, type: "true"},
        {label: "憑依追加ダメージ比例回復", skill: "T", damage: Constants.LyAnhT.additional_damage, multiplier: Constants.LyAnhT.possesed_heal, type: "heal"},
        {label: "悪霊追加ダメージ比例回復", skill: "T", damage: Constants.LyAnhT.additional_damage, multiplier: Constants.LyAnhT.ghost_heal, type: "heal"}
    ],
    skill: [
        [{label: "人間Q", skill: "Q", damage: Constants.LyAnhQ.damage}],
        [{label: "人間W", skill: "W", damage: Constants.LyAnhW.damage}],
        [{label: "人間E", skill: "E", damage: Constants.LyAnhE.damage}],
        [{label: "憑依Q", skill: "Q", damage: Constants.GhostQ.damage}],
        [{label: "憑依W", skill: "W", damage: Constants.GhostW.damage}],
        [
            {label: "憑依E振り下ろし", skill: "E", damage: Constants.GhostE.first_damage},
            {label: "憑依E引き寄せ", skill: "E", damage: Constants.GhostE.second_damage}
        ],
        [
            {label: "R飛び出し", skill: "R", damage: Constants.LyAnhR.damage}
        ]
    ]    
}


export default table;