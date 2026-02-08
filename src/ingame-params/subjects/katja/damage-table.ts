import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.katja.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.katja.q-min" }), origin: "Q", value: Constants.Q.min_damage },
            { label: props.intl.formatMessage({ id: "subject.katja.q-max" }), origin: "Q", value: Constants.Q.max_damage }
        ],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.katja.r" }, { value: 1 }), origin: "R", value: Constants.R.first_damage },
            { label: props.intl.formatMessage({ id: "subject.katja.r" }, { value: 2 }), origin: "R", value: Constants.R.second_damage },
            { label: props.intl.formatMessage({ id: "subject.katja.r" }, { value: 3 }), origin: "R", value: Constants.R.third_damage }
        ]
    ]
})

export default table;