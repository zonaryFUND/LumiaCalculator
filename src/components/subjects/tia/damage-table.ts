import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const blue = {
    ...Constants.Q.damage,
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.b.center_addition.base[i])
}

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q黄赤/青中心部以外", skill: "Q", value: Constants.Q.damage},
            {label: "Q青中心部", skill: "Q", value: blue}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [
            {label: "怒りのリス(黄赤)", skill: "T", value: Constants.T.yr.damage},
            {label: "祝福のリス(赤青)", skill: "T", value: Constants.T.rb.damage},
            {label: "魔法のリス(青黄)", skill: "T", value: Constants.T.by.damage}
        ]
    ]   
}

export default table;