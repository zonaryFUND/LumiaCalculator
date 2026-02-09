import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.mai.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [{ label: "Q", origin: "Q", value: Constants.Q.damage }],
        [{ label: "W", origin: "W", value: Constants.W.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.mai.e-shield" }), origin: "E", value: Constants.E.shield, type: { type: "shield", target: "any" } },
            { label: "E2", origin: "E", value: Constants.E.damage }
        ],
        [{ label: props.intl.formatMessage({ id: "subject.mai.r-heal" }), origin: "R", value: Constants.R.heal, type: { type: "heal", target: "any" } }]
    ]
})

export default table;