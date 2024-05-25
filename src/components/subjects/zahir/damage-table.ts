import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const rChaseMax = Constants.R.total_count - 1;
const maxR = {
    base: Constants.R.first_damage.base.map((v, i) => v + Constants.R.second_damage.base[i] * rChaseMax),
    amp: Constants.R.first_damage.amp + Constants.R.second_damage.amp * rChaseMax
}

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: "強化Q", skill: "Q", value: Constants.Q.enhanced_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R初撃", skill: "R", value: Constants.R.first_damage},
            {label: "R2発目以降", skill: "R", value: Constants.R.second_damage},
            {label: "R全ヒット(初撃+追撃4)", skill: "R", value: maxR}
        ],
        [{label: "T", skill: "T", value: Constants.T.damage}]
    ]
}

export default table;