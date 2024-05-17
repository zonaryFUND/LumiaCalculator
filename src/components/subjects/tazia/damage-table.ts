import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const eMax = Constants.E.glass_additional_max / Constants.E.glass_additional_damage + 1
const rMax = Constants.R.glass_additional_max / Constants.R.glass_additional_damage;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Tディフェットーゾ追加ダメージ", skill: "T", damage: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Qスティレット", skill: "Q", damage: Constants.Q.damage},
            {label: "Qスパーダ衝突", skill: "Q", damage: Constants.Q.spada_damage},
            {label: "Qスパーダ爆発", skill: "Q", damage: Constants.Q.spada_blast_damage}
        ],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [
            {label: "Eシールド", skill: "E", damage: Constants.E.shield, type: "shield"},
            {label: `Eガラス片最大破壊時(${eMax})シールド`, skill: "E", damage: Constants.E.shield, type: "shield", multiplier: Constants.E.glass_additional_max + 100},
            {label: "Eダメージ", skill: "E", damage: Constants.E.damage},
            {label: `Eガラス片最大破壊時(${eMax})ダメージ`, skill: "E", damage: Constants.E.damage, multiplier: Constants.E.glass_additional_max + 100}
        ],
        [
            {label: "R出現", skill: "R", damage: Constants.R.damage},
            {label: "R爆発", skill: "R", damage: Constants.R.blast_damage},
            {label: `R爆発ガラス片最大破壊時(${rMax})`, skill: "R", damage: Constants.R.blast_damage, multiplier: Constants.R.glass_additional_max}
        ]
    ]   
}

export default table;