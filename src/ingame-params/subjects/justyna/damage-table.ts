import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const rMax = Constants.R.duration/ Constants.R.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.justyna.e-additional"}), origin: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.justyna.q1-2hit"}), origin: "Q", value: Constants.Q.damage, multiplier: 200},
            {label: "Q2", origin: "Q", value: Constants.Q.reuse_damage}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.justyna.w-2hit"}), origin: "W", value: Constants.W.damage, multiplier: 200}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.justyna.r-1hit"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.justyna.r-maxhit"}, {value: rMax}), origin: "R", value: Constants.R.damage, multiplier: rMax * 100}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.justyna.t-additional-marked"}), origin: "T", value: Constants.T.mark_damage},
            {label: props.intl.formatMessage({id: "subject.justyna.t-additional-notmarked"}), origin: "T", value: Constants.T.mark_damage, multiplier: Constants.T.splash_damage}
        ]
    ]   
})

export default table;