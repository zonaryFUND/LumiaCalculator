import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const wMax = Constants.W.max_duration / Constants.W.heal_tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.bianca.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.bianca.q-pass"}), skill: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.q-lance"}), skill: "Q", value: Constants.Q.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.bianca.w-heal-1tick"}, {value: 0.5}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.bianca.w-heal-max-tick"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: wMax * 100},
            {label: props.intl.formatMessage({id: "subject.bianca.w-max-heal-1tick"}, {value: 0.5}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.W.enhanced_heal_ratio * 100},
            {label: props.intl.formatMessage({id: "subject.bianca.w-max-heal-max-tick"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.W.enhanced_heal_ratio * wMax * 100 }
        ],
        [
            {label: props.intl.formatMessage({id: "subject.bianca.e-min"}), skill: "E", value: Constants.E.min_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.e-max"}), skill: "E", value: Constants.E.max_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.e-heal"}), skill: "E", value: Constants.E.heal, type: {type: "heal", target: "self"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.bianca.r-first"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.r-finish-min"}), skill: "R", value: Constants.R.min_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.r-finish-max"}), skill: "R", value: Constants.R.max_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.r-heal-base"}), skill: "R", value: Constants.R.heal, type: {type: "heal", target: "self"}}
        ]
    ]   
})

export default table;