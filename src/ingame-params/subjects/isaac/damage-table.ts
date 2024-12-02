import { DamageTable, DamageTableGenerator } from "../type";
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

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", "skill": "Q", value: Constants.Q.damage}],
        [{label: "W", "skill": "W", value: Constants.W.damage}],
        [{label: "E2", "skill": "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.isaac.r-nostack"}), "skill": "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.isaac.r-1stack"}), "skill": "R", value: r(1)},
            {label: props.intl.formatMessage({id: "subject.isaac.r-2stack"}), "skill": "R", value: r(2)}
        ],
        [
            {label: "T", "skill": "T", value: Constants.T.damage},
            {label: props.intl.formatMessage({id: "subject.isaac.passive-heal"}), "skill": "T", value: Constants.T.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.T.heal},
        ],
    ]
})

export default table;