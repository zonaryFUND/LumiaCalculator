import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const rTicks = Constants.R.duration / Constants.R.heal_tick;

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "進化T追加ダメージ", skill: "T", damage: Constants.T.damage, type: "basic"},
        {label: `進化T追加ダメージ全ヒット(${Constants.T.evoluted_sound_wave})`, skill: "T", damage: Constants.T.damage, type: "basic", multiplier: Constants.T.evoluted_sound_wave * 100}
    ],
    skill: [
        [
            {label: "Q最小", skill: "Q", damage: Constants.Q.min_damage},
            {label: "Q最大", skill: "Q", damage: Constants.Q.max_damage},
        ],
        [{label: "進化W追加ダメージ", skill: "W", damage: Constants.W.buff_damage}],
        [
            {label: "E", skill: "E", damage: Constants.E.damage},
            {label: "E最大ヒット(2)", skill: "E", damage: Constants.E.damage, multiplier: 2},
            {label: "進化E最大ヒット(3)", skill: "E", damage: Constants.E.damage, multiplier: 3}
        ],
        [
            {label: "R回復/0.5秒", skill: "R", damage: Constants.R.heal, type: "heal"},
            {label: `R回復最大(${rTicks}ティック)`, skill: "R", damage: Constants.R.heal, type: "heal", multiplier: rTicks * 100}
        ]
    ]   
}

export default table;