import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W回復", skill: "W", value: Constants.W.heal, type: "heal"}],
        [{label: "Eシールド", skill: "E", value: Constants.E.shield, type: "shield"}]
    ]   
}

export default table;