import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const rMax = Constants.R.duration/ Constants.R.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.justyna.e-additional"}), skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.justyna.q1-2hit"}), skill: "Q", value: Constants.Q.damage, multiplier: 200},
            {label: "Q2", skill: "Q", value: Constants.Q.reuse_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.justyna.w-2hit"}), skill: "W", value: Constants.W.damage, multiplier: 200}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.justyna.r-1hit"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.justyna.r-maxhit"}, {value: rMax}), skill: "R", value: Constants.R.damage, multiplier: rMax * 100}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.justyna.t-additional-marked"}), skill: "T", value: Constants.T.mark_damage},
            {label: props.intl.formatMessage({id: "subject.justyna.t-additional-notmarked"}), skill: "T", value: Constants.T.mark_damage, multiplier: Constants.T.splash_damage},
            {label: props.intl.formatMessage({id: "subject.justyna.t-movement-speed"}), skill: "T", value: Constants.T.movement_speed, type: {type: "misc", percentExpression: true}}
        ]
    ]   
})

export default table;