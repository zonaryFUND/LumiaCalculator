import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const reMax = Constants.R.E.area_duration / Constants.R.E.dot_tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.barbara.t-additional"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.barbara.q-sentry-aa"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.q-sentry-railgun"}), origin: "Q", value: Constants.Q.railgun_damage}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage}
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.barbara.rq-aa"}), origin: "R", value: Constants.R.Q.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rq-railgun"}), origin: "R", value: Constants.R.Q.railgun_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rw-hit"}), origin: "R", value: Constants.R.W.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rw-dot"}), origin: "R", value: Constants.R.W.dot_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.re-hit"}), origin: "R", value: Constants.R.E.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.re-dot-1tick"}), origin: "R", value: Constants.R.E.dot_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.re-dot-all"}, {value: reMax}), origin: "R", value: Constants.R.E.dot_damage, multiplier: reMax * 100}
        ]
    ]   
})

export default table;