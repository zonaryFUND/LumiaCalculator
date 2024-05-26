import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const enhanceQ = {
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.additional_damage.base[i]),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp
}

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q中", skill: "Q", value: Constants.Q.damage},
            {label: "Q先端", skill: "Q", value: enhanceQ}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: "W(2ヒット)", skill: "W", value: Constants.W.damage, multiplier: [{basic: 200}]}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: "R最終", skill: "R", value: Constants.R.finish_damage}
        ],
        [{label: "T", skill: "T", value: Constants.T.damage}]
    ]   
}

export default table;