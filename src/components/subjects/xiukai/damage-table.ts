import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W回復", skill: "W", value: Constants.W.heal, type: "heal"}],
        [
            {label: "E1", skill: "E", value: Constants.E.first_damage},
            {label: "E2", skill: "E", value: Constants.E.second_damage}
        ],
        [
            {label: "R1ヒット", skill: "R", value: Constants.R.damage},
            {label: `R全ヒット(${Constants.R.count})`, skill: "R", value: Constants.R.damage, multiplier: Constants.R.count * 100}
        ]
    ]
}

export default table;