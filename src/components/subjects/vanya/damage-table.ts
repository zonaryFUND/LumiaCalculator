import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.vanya.passive-additional"}), skill: "T", value: Constants.T.basic_attack_damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.vanya.q-2hit"}), skill: "Q", value: Constants.Q.damage, multiplier: 200},
        ],
        [
            {label: "W1", skill: "W", value: Constants.W.first_damage},
            {label: props.intl.formatMessage({id: "subject.vanya.w1-max-hit"}, {value: Constants.W.count}), skill: "W", value: Constants.W.first_damage, multiplier: Constants.W.count * 100},
            {label: "W2", skill: "W", value: Constants.W.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.vanya.e-inner"}), skill: "E", value: Constants.E.inner_damage},
            {label: props.intl.formatMessage({id: "subject.vanya.e-outer"}), skill: "E", value: Constants.E.outer_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.vanya.r-hit"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.vanya.r-awake"}), skill: "R", value: Constants.R.wakeup_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.vanya.passive-dot"}), skill: "T", value: Constants.T.damage_over_time},
            {label: props.intl.formatMessage({id: "subject.vanya.passive-shield"}), skill: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.vanya.passive-shield-decline"}), skill: "T", value: Constants.T.shield_decline, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.vanya.passive-shield-max"}), skill: "T", value: Constants.T.max_shield, type: {type: "shield", target: "self"}}
        ]
    ]   
})

export default table;