import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const wMax = Constants.W.waves;
const rMax = Constants.R.duration / Constants.R.tick - 1; // last tick is final blast

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Q対象追加ダメージ", skill: "Q", value: Constants.Q.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: "W波動", skill: "W", value: Constants.W.damage},
            {label: `W波動最大ヒット(${wMax})`, skill: "W", value: Constants.W.damage, multiplier: [{basic: wMax * 100}]},
            {label: "W最終", skill: "W", value: Constants.W.final_damage},
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R引き寄せ", skill: "R", value: Constants.R.damage},
            {label: "R継続/0.5秒", skill: "R", value: Constants.R.damage_on_time},
            {label: `R継続最大ヒット(${rMax})`, skill: "R", value: Constants.R.damage_on_time, multiplier: [{basic: rMax * 100}]},
            {label: "R回復/0.5秒", skill: "R", value: Constants.R.heal},
            {label: `R回復最大ヒット(${rMax})`, skill: "R", value: Constants.R.heal, multiplier: [{basic: rMax * 100}]},
            {label: "R最終(最小)", skill: "R", value: Constants.R.final_damage.min},
            {label: `R最終(${Constants.R.duration}秒持続後最大値)`, skill: "R", value: Constants.R.final_damage.max}
        ],
        [{label: "T回復", skill: "T", value: Constants.T.heal, type: "heal"}]
    ]
}


export default table;