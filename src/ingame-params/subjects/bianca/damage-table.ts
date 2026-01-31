import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const wMax = Constants.W.max_duration / Constants.W.heal_tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.bianca.passive-additional"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.bianca.q-pass"}), origin: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.q-lance"}), origin: "Q", value: Constants.Q.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.bianca.w-heal-1tick"}, {value: 0.5}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.bianca.w-heal-max-tick"}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: wMax * 100},
            {label: props.intl.formatMessage({id: "subject.bianca.w-max-heal-1tick"}, {value: 0.5}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.W.enhanced_heal_ratio * 100},
            {label: props.intl.formatMessage({id: "subject.bianca.w-max-heal-max-tick"}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.W.enhanced_heal_ratio * wMax * 100 }
        ],
        [
            {label: props.intl.formatMessage({id: "subject.bianca.e-min"}), origin: "E", value: Constants.E.min_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.e-max"}), origin: "E", value: Constants.E.max_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.e-heal"}), origin: "E", value: Constants.E.heal, type: {type: "heal", target: "self"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.bianca.r-first"}), origin: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.r-finish-min"}), origin: "R", value: Constants.R.min_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.r-finish-max"}), origin: "R", value: Constants.R.max_damage},
            {label: props.intl.formatMessage({id: "subject.bianca.r-heal-base"}), origin: "R", value: Constants.R.heal, type: {type: "heal", target: "self"}}
        ]
    ]   
})

export default table;