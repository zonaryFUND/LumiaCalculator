import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", damage: Constants.Q.damage}],
        [{label: "W回復", skill: "W", damage: Constants.W.heal, type: "heal"}],
        [{label: "Eシールド", skill: "E", damage: Constants.E.shield, type: "shield"}]
    ]   
}

export default table;