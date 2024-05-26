import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "イレムR追加ダメージ", skill: "R", value: Constants.IremR.damage},
        {label: "ネコQ突進追加ダメージ", skill: "Q", value: Constants.CatQ.damage},
    ],
    skill: [
        [
            {label: "イレムQ(0バウンド)", skill: "Q", value: Constants.IremQ.damage},
            {label: "イレムQ(1バウンド)", skill: "Q", value: Constants.IremQ.damage, multiplier: [{basic: (1 + Constants.IremQ.ratio) * 100}]},
            {label: "イレムQ(2バウンド)", skill: "Q", value: Constants.IremQ.damage, multiplier: [{basic: (1 + Constants.IremQ.ratio * 2) * 100}]},
            {label: "イレムQ(3バウンド)", skill: "Q", value: Constants.IremQ.damage, multiplier: [{basic: (1 + Constants.IremQ.ratio * 3) * 100}]},
        ],
        [{label: "イレムW", skill: "W", value: Constants.IremW.damage}],
        [
            {label: "ネコQパンチ", skill: "Q", value: Constants.CatQ.rush_damage},
            {label: `ネコQパンチ最大ヒット(${Constants.CatQ.rush.amount})`, skill: "Q", value: Constants.CatQ.rush_damage, multiplier: [{basic: Constants.CatQ.rush.amount * 100}]}
        ],
        [{label: "ネコW", skill: "W", value: Constants.CatW.damage}],
        [{label: "ネコE", skill: "E", value: Constants.CatE.damage}],
        [{label: "ネコRシールド", skill: "R", value: Constants.CatR.shield, type: "shield"}]
    ]    
}


export default table;