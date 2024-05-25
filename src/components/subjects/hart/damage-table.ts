import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const rTicks = Constants.R.duration / Constants.R.heal_tick;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "進化T追加ダメージ", skill: "T", value: Constants.T.damage, type: "basic"},
        {label: `進化T追加ダメージ全ヒット(${Constants.T.evoluted_sound_wave})`, skill: "T", value: Constants.T.damage, type: "basic", multiplier: Constants.T.evoluted_sound_wave * 100}
    ],
    skill: [
        [
            {label: "Q最小", skill: "Q", value: Constants.Q.min_damage},
            {label: "Q最大", skill: "Q", value: Constants.Q.max_damage},
        ],
        [{label: "進化W追加ダメージ", skill: "W", value: Constants.W.buff_damage}],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: "E最大ヒット(2)", skill: "E", value: Constants.E.damage, multiplier: 2},
            {label: "進化E最大ヒット(3)", skill: "E", value: Constants.E.damage, multiplier: 3}
        ],
        [
            {label: "R回復/0.5秒", skill: "R", value: Constants.R.heal, type: "heal"},
            {label: `R回復最大(${rTicks}ティック)`, skill: "R", value: Constants.R.heal, type: "heal", multiplier: rTicks * 100}
        ]
    ]   
}

export default table;