import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q1", origin: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.luke.q2-min"}), origin: "Q", value: Constants.Q.second_damage},
            {label: props.intl.formatMessage({id: "subject.luke.q2-max"}), origin: "Q", value: Constants.Q.second_damage, multiplier: Constants.Q.enhance_max + 100}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.luke.w-heal-min"}), origin: "W", value: {lostHP: Constants.W.heal}, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.luke.w-heal-max"}), origin: "W", value: {lostHP: Constants.W.max_heal}, type: {type: "heal", target: "self"}}
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.luke.r-min"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.luke.r-max"}), origin: "R", value: Constants.R.damage, multiplier: Constants.R.max_multiplier * 100},
            {label: props.intl.formatMessage({id: "subject.luke.r-additional-1stack"}), origin: "R", value: Constants.R.stack_damage},
            {label: props.intl.formatMessage({id: "subject.luke.r-additional-max-stack"}, {value: Constants.R.max_stack}), origin: "R", value: Constants.R.stack_damage, multiplier: Constants.R.max_stack * 100}
        ]
    ]   
})

export default table;