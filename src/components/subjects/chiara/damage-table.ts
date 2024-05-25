import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const qMax = {
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.additional_damage.base[i] * 4),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp * 4
}

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q1本ヒット", skill: "Q", value: Constants.Q.damage},
            {label: "Q2本目以降ヒット追加ダメージ", skill: "Q", value: Constants.Q.additional_damage},
            {label: "Q最大ダメージ", skill: "Q", value: qMax},
            {label: "Q1本ヒット時回復", skill: "Q", value: Constants.Q.heal, type: "heal"},
            {label: "Q最大ヒット(5)時回復", skill: "Q", value: Constants.Q.heal, type: "heal", multiplier: 500}
        ],
        [
            {label: "Wシールド最小値", skill: "W", value: Constants.W.shield, type: "shield"},
            {label: `Wシールド最大値(体力${Constants.W.max_shield_hp}％以下)`, skill: "W", value: Constants.W.shield, type: "shield", multiplier: 100 + Constants.W.max_shield},
            {label: "W爆発ダメージ", skill: "W", value: Constants.W.damage}
        ],
        [
            {label: "E命中", skill: "E", value: Constants.E.damage},
            {label: "E発動", skill: "E", value: Constants.E.second_damage}
        ],
        ([
            {label: "R周囲持続ダメージ/秒", skill: "R", value: Constants.R.damage},
            {label: "R周囲人数あたり体力回復/秒", skill: "R", value: Constants.R.heal, type: "heal"}
        ] as SkillValueProps[])
        .concat([...Array(Constants.T.max_stack + 1)].map((_, i) => (
            {label: `R審判固定ダメージ(烙印スタック${i})`, skill: "R", value: Constants.R.finish_damage, type: "true", multiplier: i == 0 ? undefined : (100 + i * Constants.R.additional_damage_per_stack)} as SkillValueProps)
        ))
    ]
}

export default table;