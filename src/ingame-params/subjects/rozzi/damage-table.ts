import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.rozzi.passive-first" }), origin: "T", value: Constants.T.first_damage, type: { type: "basic" } },
        { label: props.intl.formatMessage({ id: "subject.rozzi.passive-second" }), origin: "T", value: Constants.T.second_damage, type: { type: "basic" } }
    ],
    skill: [
        [{ label: "Q", origin: "Q", value: Constants.Q.damage }],
        [{ label: "W", origin: "W", value: Constants.W.damage }],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [
            { label: "R", origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.rozzi.r-blast" }), origin: "R", value: { targetMaxHP: Constants.R.additional_damage }, type: { type: "true" } }
        ]
    ]
})

export default table;