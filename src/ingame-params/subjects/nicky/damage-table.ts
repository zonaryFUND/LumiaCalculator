import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.nicky.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.nicky.q1-min" }), origin: "Q", value: Constants.Q.min_damage },
            { label: props.intl.formatMessage({ id: "subject.nicky.q1-max" }), origin: "Q", value: Constants.Q.max_damage },
            { label: "Q2", origin: "Q", value: Constants.Q.q2_damage }
        ],
        [{ label: "W", origin: "W", value: Constants.W.damage }],
        [
            { label: "E", origin: "E", value: Constants.E.damage },
            { label: props.intl.formatMessage({ id: "subject.nicky.e-enhanced" }), origin: "E", value: Constants.E.e2_damage },
        ],
        [
            { label: "R", origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.nicky.r-enhanced" }), origin: "R", value: Constants.R.enhanced_damage }
        ]
    ]
})

export default table;