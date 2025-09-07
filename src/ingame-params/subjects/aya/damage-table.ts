import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const wCount = (props.status.attackSpeed.multiplier.dividedBy(30).floor().clamp(0, Constants.W.max_bullets - Constants.W.bullets).toNumber() ?? 0) + Constants.W.bullets;

    return {
        basicAttack: ["standard"],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.aya-q1"}), origin: "Q", value: Constants.Q.first_damage, type: {type: "basic", critical: "none"}},
                {label: props.intl.formatMessage({id: "subject.aya-q2"}), origin: "Q", value: Constants.Q.second_damage}
            ],
            [
                {label: "W", origin: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.aya-w-max-hit"}, {value: wCount}), origin: "W", value: Constants.W.damage, multiplier: wCount * 100}
            ],
            [
                {label: "R", origin: "R", value: Constants.R.damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.aya-passive-shield"}), origin: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}
            ]
        ]
    }
}

export default table;