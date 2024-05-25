import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "T2連続基本攻撃1発目", skill: "T", value: Constants.T.first_damage, type: "basic"},
        {label: "T2連続基本攻撃1発目", skill: "T", value: Constants.T.second_damage, type: "basic"}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}]
    ]   
}

export default table;