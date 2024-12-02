import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.abigail.passive-damage"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.first_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.second_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.abigail.w-shield"}), skill: "W", value: Constants.W.shield.amount, type: {type: "shield", target: "self"}},
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage}
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage}
        ]
    ]
})

export default table;