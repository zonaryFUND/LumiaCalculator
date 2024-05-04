import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W回復", skill: "W", damage: Constants.W.heal, type: "heal"}],
        [
            {label: "E1", skill: "E", damage: Constants.E.first_damage},
            {label: "E2", skill: "E", damage: Constants.E.second_damage}
        ],
        [
            {label: "R1ヒット", skill: "R", damage: Constants.R.damage},
            {label: `R全ヒット(${Constants.R.count})`, skill: "R", damage: Constants.R.damage, multiplier: Constants.R.count * 100}
        ]
    ]
}

export default table;