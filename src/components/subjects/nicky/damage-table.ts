import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.nicky.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.nicky.q1-min"}), skill: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.nicky.q1-max"}), skill: "Q", value: Constants.Q.max_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.q2_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.nicky.e-enhanced"}), skill: "E", value: Constants.E.e2_damage},
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.nicky.r-enhanced"}), skill: "R", value: Constants.R.enhanced_damage}
        ]
    ]   
})

export default table;