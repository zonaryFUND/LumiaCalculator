import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "イレムR追加ダメージ", skill: "R", damage: Constants.IremR.damage},
        {label: "ネコQ突進追加ダメージ", skill: "Q", damage: Constants.CatQ.damage},
    ],
    skill: [
        [
            {label: "イレムQ(0バウンド)", skill: "Q", damage: Constants.IremQ.damage},
            {label: "イレムQ(1バウンド)", skill: "Q", damage: Constants.IremQ.damage, multiplier: (1 + Constants.IremQ.ratio) * 100},
            {label: "イレムQ(2バウンド)", skill: "Q", damage: Constants.IremQ.damage, multiplier: (1 + Constants.IremQ.ratio * 2) * 100},
            {label: "イレムQ(3バウンド)", skill: "Q", damage: Constants.IremQ.damage, multiplier: (1 + Constants.IremQ.ratio * 3) * 100},
        ],
        [{label: "イレムW", skill: "W", damage: Constants.IremW.damage}],
        [
            {label: "ネコQパンチ", skill: "Q", damage: Constants.CatQ.rush_damage},
            {label: `ネコQパンチ最大ヒット(${Constants.CatQ.rush.amount})`, skill: "Q", damage: Constants.CatQ.rush_damage, multiplier: Constants.CatQ.rush.amount * 100}
        ],
        [{label: "ネコW", skill: "W", damage: Constants.CatW.damage}],
        [{label: "ネコE", skill: "E", damage: Constants.CatE.damage}],
        [{label: "ネコRシールド", skill: "R", damage: Constants.CatR.shield, type: "shield"}]
    ]    
}


export default table;