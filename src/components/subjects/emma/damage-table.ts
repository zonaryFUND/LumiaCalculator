import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.emma.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.emma.q-2hit"}), skill: "Q", value: Constants.Q.damage, multiplier: 200},
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.emma.r-pigeon"}), skill: "R", value: Constants.R.Q.damage},
            {label: props.intl.formatMessage({id: "subject.emma.r-hat"}), skill: "R", value: Constants.R.W.damage},
            {label: props.intl.formatMessage({id: "subject.emma.r-rabbit"}), skill: "R", value: Constants.R.E.damage}
        ],
        [{label: props.intl.formatMessage({id: "subject.emma.passive-shield"}), skill: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}]
    ]
})

export default table;