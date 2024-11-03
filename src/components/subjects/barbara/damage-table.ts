import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const reMax = Constants.R.E.area_duration / Constants.R.E.dot_tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.barbara.t-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.barbara.q-sentry-aa"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.q-sentry-railgun"}), skill: "Q", value: Constants.Q.railgun_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.barbara.rq-aa"}), skill: "R", value: Constants.R.Q.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rq-railgun"}), skill: "R", value: Constants.R.Q.railgun_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rw-hit"}), skill: "R", value: Constants.R.W.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rw-dot"}), skill: "R", value: Constants.R.W.dot_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.re-hit"}), skill: "R", value: Constants.R.E.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.re-dot-1tick"}), skill: "R", value: Constants.R.E.dot_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.re-dot-all"}, {value: reMax}), skill: "R", value: Constants.R.E.dot_damage, multiplier: reMax * 100}
        ]
    ]   
})

export default table;