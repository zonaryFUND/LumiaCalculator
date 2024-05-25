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
        [{label: "Q", "skill": "Q", value: Constants.Q.damage}],
        [{label: "W", "skill": "W", value: Constants.W.damage}],
        [{label: "E2", "skill": "E", value: Constants.E.damage}],
        [
            {label: "R(スタックなし)", "skill": "R", value: r(0)},
            {label: "R(1スタック)", "skill": "R", value: r(1)},
            {label: "R(2スタック)", "skill": "R", value: r(2)}
        ],
        [{label: "T", "skill": "T", value: Constants.T.damage}],
    ]
}

export default table;