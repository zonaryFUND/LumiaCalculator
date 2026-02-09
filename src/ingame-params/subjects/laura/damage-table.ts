import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.laura.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [
            { label: "Q", origin: "Q", value: Constants.Q.damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.laura.w-damage" }), origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.laura.w-heal" }), origin: "W", value: Constants.W.heal, type: { type: "heal", target: "self" } }
        ],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.laura.r-first" }), origin: "R", value: Constants.R.first_damage },
            { label: props.intl.formatMessage({ id: "subject.laura.r-second" }), origin: "R", value: Constants.R.second_damage },
            { label: props.intl.formatMessage({ id: "subject.laura.r-shield" }), origin: "R", value: Constants.R.shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.laura.r-additional-shield-1" }), origin: "R", value: Constants.R.additional_shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.laura.r-additional-shield-2" }), origin: "R", value: Constants.R.additional_shield, type: { type: "shield", target: "self" }, multiplier: 200 }
        ]
    ]
})

export default table;