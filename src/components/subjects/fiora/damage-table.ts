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
            {label: "Q中", skill: "Q", damage: Constants.Q.damage},
            {label: "Q先端", skill: "Q", damage: enhanceQ}
        ],
        [
            {label: "W", skill: "W", damage: Constants.W.damage},
            {label: "W(2ヒット)", skill: "W", damage: Constants.W.damage, multiplier: 200}
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [
            {label: "R", skill: "R", damage: Constants.R.damage},
            {label: "R最終", skill: "R", damage: Constants.R.finish_damage}
        ],
        [{label: "T", skill: "T", damage: Constants.T.damage}]
    ]   
}

export default table;