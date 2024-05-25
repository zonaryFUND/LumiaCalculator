import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const rMax = Constants.R2.count;

const table: DamageTable = {
    basicAttack: [
        {label: "取材中基本攻撃(1ティック)", skill: "T", value: Constants.T.damage, type: "basic"},
        {label: "取材中基本攻撃全ヒット(4)", skill: "T", value: Constants.T.damage, type: "basic", multiplier: 400},
        {label: "放送中基本攻撃(1ティック)", skill: "T", value: Constants.T.broadcasting_damage, type: "basic"},
        {label: "放送中基本攻撃全ヒット(4)", skill: "T", value: Constants.T.broadcasting_damage, type: "basic", multiplier: 400},
    ],
    skill: [
        [{label: "取材中Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "取材中W", skill: "W", value: Constants.W.damage}],
        [{label: "取材中T追加ダメージ", skill: "T", value: Constants.T.mark_damage}],
        [{label: "放送中Q", skill: "Q", value: Constants.Q2.damage}],
        [{label: "放送中W", skill: "W", value: Constants.W2.damage}],
        [{label: "放送中E2", skill: "E", value: Constants.E2.damage}],
        [
            {label: "放送中R外周1ティック", skill: "R", value: Constants.R2.first_outer_damage},
            {label: `放送中R外周全ヒット(${rMax})`, skill: "R", value: Constants.R2.first_outer_damage, multiplier: rMax * 100},
            {label: "放送中R中央1ティック", skill: "R", value: Constants.R2.first_center_damage},
            {label: `放送中R中央全ヒット(${rMax})`, skill: "R", value: Constants.R2.first_center_damage, multiplier: rMax * 100},
            {label: "放送中R外周最終", skill: "R", value: Constants.R2.second_outer_damage},
            {label: "放送中R中央最終", skill: "R", value: Constants.R2.second_center_damage}
        ],
        [{label: "放送中T追加ダメージ", skill: "T", value: Constants.T.broadcasting_mark_damage}]
    ]   
}

export default table;