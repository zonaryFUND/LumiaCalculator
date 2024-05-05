import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T2連続基本攻撃1発目", skill: "T", damage: Constants.T.first_damage, type: "basic"},
        {label: "T2連続基本攻撃1発目", skill: "T", damage: Constants.T.second_damage, type: "basic"}
    ],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W", skill: "W", damage: Constants.W.damage}],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [{label: "R", skill: "R", damage: Constants.R.damage}]
    ]   
}

export default table;