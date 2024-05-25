import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T追加ダメージ", skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [...Array(Constants.Q.max_bomb)].map((_, i) => ({
            label: `Q爆弾${i + 1}個分`, skill: "Q", value: Constants.Q.damage, multiplier: i == 0 ? undefined : 100 + Constants.Q.multiple_bomb_damage_multiplier * i
        })),
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [...Array(Constants.R.max_level)].map((_, i) => ({
            label: `Rレベル${i + 1}`, skill: "R", value: Constants.R.damage, multiplier: i == 0 ? undefined : (i + 1) * 100
        }))
    ]   
}

export default table;