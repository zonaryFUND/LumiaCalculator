import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.emma.passive-additional"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.emma.q-2hit"}), origin: "Q", value: Constants.Q.damage, multiplier: 200},
        ],
        [{label: "W", origin: "W", value: Constants.W.damage}],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.emma.r-pigeon"}), origin: "R", value: Constants.R.Q.damage},
            {label: props.intl.formatMessage({id: "subject.emma.r-hat"}), origin: "R", value: Constants.R.W.damage},
            {label: props.intl.formatMessage({id: "subject.emma.r-rabbit"}), origin: "R", value: Constants.R.E.damage}
        ],
        [{label: props.intl.formatMessage({id: "subject.emma.passive-shield"}), origin: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}]
    ]
})

export default table;