import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.abigail.passive-damage"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", origin: "Q", value: Constants.Q.first_damage},
            {label: "Q2", origin: "Q", value: Constants.Q.second_damage}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.abigail.w-shield"}), origin: "W", value: Constants.W.shield.amount, type: {type: "shield", target: "self"}},
        ],
        [
            {label: "E", origin: "E", value: Constants.E.damage}
        ],
        [
            {label: "R", origin: "R", value: Constants.R.damage}
        ]
    ]
})

export default table;