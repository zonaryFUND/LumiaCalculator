import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const wMax = Constants.W.waves;
const rMax = Constants.R.duration / Constants.R.tick - 1; // last tick is final blast

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Q対象追加ダメージ", skill: "Q", damage: Constants.Q.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [
            {label: "W波動", skill: "W", damage: Constants.W.damage},
            {label: `W波動最大ヒット(${wMax})`, skill: "W", damage: Constants.W.damage, multiplier: wMax * 100},
            {label: "W最終", skill: "W", damage: Constants.W.final_damage},
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R引き寄せ", skill: "R", damage: Constants.R.damage},
            {label: "R継続/0.5秒", skill: "R", damage: Constants.R.damage_on_time},
            {label: `R継続最大ヒット(${rMax})`, skill: "R", damage: Constants.R.damage_on_time, multiplier: rMax * 100},
            {label: "R回復/0.5秒", skill: "R", damage: Constants.R.heal},
            {label: `R回復最大ヒット(${rMax})`, skill: "R", damage: Constants.R.heal, multiplier: rMax * 100},
            {label: "R最終(最小)", skill: "R", damage: Constants.R.final_damage.min},
            {label: `R最終(${Constants.R.duration}秒持続後最大値)`, skill: "R", damage: Constants.R.final_damage.max}
        ],
        [{label: "T回復", skill: "T", damage: Constants.T.heal, type: "heal"}]
    ]
}


export default table;