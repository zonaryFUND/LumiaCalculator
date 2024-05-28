import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const eMax = Constants.E.duration / Constants.E.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.barbara.sentry-aa"}), skill: "Q", value: Constants.Q.sentry_damage}
    ],
    skill: [
        [{label: props.intl.formatMessage({id: "subject.barbara.q-place"}), skill: "Q", value: Constants.Q.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.barbara.w-laser"}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.w-sentry-railgun"}), skill: "W", value: Constants.W.sentry_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.barbara.e-dot"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.barbara.e-dot-max-hit"}, {value: eMax}), skill: "E", value: Constants.E.damage, multiplier: [{basic: eMax * 100}]},
            {label: props.intl.formatMessage({id: "subject.barbara.e-blast"}), skill: "E", value: Constants.E.finish_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.barbara.rq-detonate"}), skill: "R", value: Constants.R.Q.blast_damage},
            {label: props.intl.formatMessage({id: "subject.barbara.rq-warp"}), skill: "R", value: Constants.R.Q.warp_damage}
        ]
    ]   
})

export default table;