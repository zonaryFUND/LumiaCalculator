import { DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.seres.q1-shield" }), origin: "Q", value: Constants.Q.first_damage, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.seres.q1-damage" }), origin: "Q", value: Constants.Q.second_damage },
            { label: props.intl.formatMessage({ id: "subject.seres.q2-damage" }), origin: "Q", value: Constants.Q.second_damage }
        ],
        [{ label: "W", origin: "W", value: Constants.W.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.seres.e-takeover" }), origin: "E", value: Constants.E.take_over, type: { type: "misc", percentExpression: true } },
            { label: props.intl.formatMessage({ id: "subject.seres.e-lucia-takeover" }), origin: "E", value: Constants.E.lucia_take_over, type: { type: "misc", percentExpression: true } }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.seres.r-shield" }), origin: "R", value: Constants.R.first_shield, type: { type: "shield", target: "any" } }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.seres.passive1" }), origin: "T", value: Constants.T.damage },
            { label: props.intl.formatMessage({ id: "subject.seres.passive2" }), origin: "T", value: Constants.T.damage, multiplier: 200 }
        ]
    ]
})

export default table;