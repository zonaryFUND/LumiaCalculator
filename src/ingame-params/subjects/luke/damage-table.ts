import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        //{label: props.intl.formatMessage({id: "subject.luke.w-additional"}), skill: "W", value: Constants.W.basic_attack_damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.luke.q2-min"}), skill: "Q", value: Constants.Q.second_damage},
            {label: props.intl.formatMessage({id: "subject.luke.q2-max"}), skill: "Q", value: Constants.Q.second_damage, multiplier: Constants.Q.enhance_max + 100}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.luke.w-heal-min"}), skill: "W", value: {lostHP: Constants.W.heal}, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.luke.w-heal-max"}), skill: "W", value: {lostHP: Constants.W.max_heal}, type: {type: "heal", target: "self"}}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.luke.r-min"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.luke.r-max"}), skill: "R", value: Constants.R.damage, multiplier: Constants.R.max_multiplier * 100},
            {label: props.intl.formatMessage({id: "subject.luke.r-additional-1stack"}), skill: "R", value: Constants.R.stack_damage},
            {label: props.intl.formatMessage({id: "subject.luke.r-additional-max-stack"}, {value: Constants.R.max_stack}), skill: "R", value: Constants.R.stack_damage, multiplier: Constants.R.max_stack * 100}
        ]
    ]   
})

export default table;