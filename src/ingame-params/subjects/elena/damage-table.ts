import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.elena.q-first"}), origin: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.elena.q-second"}), origin: "Q", value: Constants.Q.second_damage},
        ],
        [{label: "W", origin: "W", value: Constants.W.damage}],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.elena.r-outer"}), origin: "R", value: Constants.R.outer_damage},
            {label: props.intl.formatMessage({id: "subject.elena.r-center"}), origin: "R", value: Constants.R.center_damage}
        ],
        [{label: props.intl.formatMessage({id: "subject.elena.t-additional"}), origin: "T", value: Constants.T.damage}]
    ]
})

export default table;