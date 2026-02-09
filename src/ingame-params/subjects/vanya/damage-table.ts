import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.vanya.passive-additional" }), origin: "T", value: Constants.T.basic_attack_damage }
    ],
    skill: [
        [
            { label: "Q", origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.vanya.q-2hit" }), origin: "Q", value: Constants.Q.damage, multiplier: 200 },
        ],
        [
            { label: "W1", origin: "W", value: Constants.W.first_damage },
            { label: props.intl.formatMessage({ id: "subject.vanya.w1-max-hit" }, { value: Constants.W.count }), origin: "W", value: Constants.W.first_damage, multiplier: Constants.W.count * 100 },
            { label: "W2", origin: "W", value: Constants.W.second_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.vanya.e-inner" }), origin: "E", value: Constants.E.inner_damage },
            { label: props.intl.formatMessage({ id: "subject.vanya.e-outer" }), origin: "E", value: Constants.E.outer_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.vanya.r-hit" }), origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.vanya.r-awake" }), origin: "R", value: Constants.R.wakeup_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.vanya.passive-dot" }), origin: "T", value: Constants.T.damage_over_time },
            { label: props.intl.formatMessage({ id: "subject.vanya.passive-shield" }), origin: "T", value: Constants.T.shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.vanya.passive-shield-decline" }), origin: "T", value: Constants.T.shield_decline, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.vanya.passive-shield-max" }), origin: "T", value: Constants.T.max_shield, type: { type: "shield", target: "self" } }
        ]
    ]
})

export default table;