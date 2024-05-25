import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const eMax = Constants.E.glass_additional_max / Constants.E.glass_additional_damage + 1
const rMax = Constants.R.glass_additional_max / Constants.R.glass_additional_damage;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Tディフェットーゾ追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Qスティレット", skill: "Q", value: Constants.Q.damage},
            {label: "Qスパーダ衝突", skill: "Q", value: Constants.Q.spada_damage},
            {label: "Qスパーダ爆発", skill: "Q", value: Constants.Q.spada_blast_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "Eシールド", skill: "E", value: Constants.E.shield, type: "shield"},
            {label: `Eガラス片最大破壊時(${eMax})シールド`, skill: "E", value: Constants.E.shield, type: "shield", multiplier: Constants.E.glass_additional_max + 100},
            {label: "Eダメージ", skill: "E", value: Constants.E.damage},
            {label: `Eガラス片最大破壊時(${eMax})ダメージ`, skill: "E", value: Constants.E.damage, multiplier: Constants.E.glass_additional_max + 100}
        ],
        [
            {label: "R出現", skill: "R", value: Constants.R.damage},
            {label: "R爆発", skill: "R", value: Constants.R.blast_damage},
            {label: `R爆発ガラス片最大破壊時(${rMax})`, skill: "R", value: Constants.R.blast_damage, multiplier: Constants.R.glass_additional_max}
        ]
    ]   
}

export default table;