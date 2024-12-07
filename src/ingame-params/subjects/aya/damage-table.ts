import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const wCount = (props.status.attackSpeed.additionalValue?.dividedBy(30).floor().clamp(0, Constants.W.max_bullets - Constants.W.bullets).toNumber() ?? 0) + Constants.W.bullets;

    return {
        basicAttack: ["standard"],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.aya-q1"}), skill: "Q", value: Constants.Q.first_damage, type: {type: "basic", critical: "none"}},
                {label: props.intl.formatMessage({id: "subject.aya-q2"}), skill: "Q", value: Constants.Q.second_damage}
            ],
            [
                {label: "W", skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.aya-w-max-hit"}, {value: wCount}), skill: "W", value: Constants.W.damage, multiplier: wCount * 100}
            ],
            [
                {label: "R", skill: "R", value: Constants.R.damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.aya-passive-shield"}), skill: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}
            ]
        ]
    }
}

export default table;