import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const qAll = {
    base: Constants.Q1.damage.base.map((v, i) => v * 7 + Constants.Q1.enhanced_damage.base[i] * 3),
    amp: Constants.Q1.damage.amp * 7 + Constants.Q1.enhanced_damage.amp * 3
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.piolo.r-passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.piolo.q1-base" }), origin: "Q", value: Constants.Q1.damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.q1-enhance" }, { value: Constants.Q1.enhance.map(v => `${v}`).join(",") }), origin: "Q", value: Constants.Q1.enhanced_damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.q1-max-hit" }), origin: "Q", value: qAll },
            { label: props.intl.formatMessage({ id: "subject.piolo.q2-center" }), origin: "Q", value: Constants.Q2.center_damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.q2-outer" }), origin: "Q", value: Constants.Q2.outer_damage }
        ],
        [{ label: "W2", origin: "W", value: Constants.W2.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.piolo.e1-hit-min" }), origin: "E", value: Constants.E1.first_min_damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.e1-hit-max" }), origin: "E", value: Constants.E1.first_max_damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.e1-rush-min" }), origin: "E", value: Constants.E1.second_min_damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.e1-rush-max" }), origin: "E", value: Constants.E1.second_max_damage },
            { label: "E2", origin: "E", value: Constants.E2.damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.piolo.r-damage" }), origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.piolo.r-shield" }), origin: "R", value: Constants.R.shield, type: { type: "shield", target: "self" } }
        ]

    ]
})

export default table;