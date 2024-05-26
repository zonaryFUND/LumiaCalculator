import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.katja.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.katja.q-min"}), skill: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.katja.q-max"}), skill: "Q", value: Constants.Q.max_damage}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.katja.r"}, {value: 1}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.katja.r"}, {value: 2}), skill: "R", value: Constants.R.second_damage},
            {label: props.intl.formatMessage({id: "subject.katja.r"}, {value: 3}), skill: "R", value: Constants.R.third_damage}
        ]
    ]
})

export default table;