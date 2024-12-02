import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.elena.q-first"}), skill: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.elena.q-second"}), skill: "Q", value: Constants.Q.second_damage},
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.elena.r-outer"}), skill: "R", value: Constants.R.outer_damage},
            {label: props.intl.formatMessage({id: "subject.elena.r-center"}), skill: "R", value: Constants.R.center_damage}
        ],
        [{label: props.intl.formatMessage({id: "subject.elena.t-additional"}), skill: "T", value: Constants.T.damage}]
    ]
})

export default table;