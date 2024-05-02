import { DamageTable } from "../damage-table";
import Constants from "./constants.json";

function r(stack: number): any {
    return {
        ...Constants.R.damage,
        targetLostHP: {
            base: Constants.R.additionalDamage.stack.map(v => v * stack),
            attack: 6
        }
    }
}

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", "skill": "Q", damage: Constants.Q.damage}],
        [{label: "W", "skill": "W", damage: Constants.W.damage}],
        [{label: "E2", "skill": "E", damage: Constants.E.damage}],
        [
            {label: "R(スタックなし)", "skill": "R", damage: r(0)},
            {label: "R(1スタック)", "skill": "R", damage: r(1)},
            {label: "R(2スタック)", "skill": "R", damage: r(2)}
        ],
        [{label: "T", "skill": "T", damage: Constants.T.damage}],
    ]
}

export default table;