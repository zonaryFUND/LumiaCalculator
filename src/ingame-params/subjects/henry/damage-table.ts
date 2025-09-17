import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const wMax = Constants.W.duration / Constants.W.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q1", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.henry.q1-multiplier"}), origin: "Q", value: Constants.Q.damage, multiplier: Constants.Q.second_hit_multiplier},
            {label: props.intl.formatMessage({id: "subject.henry.q1-additional"}), origin: "Q", value: Constants.Q.additional_damage, type: {type: "true"}},
            {label: "Q2", origin: "Q", value: Constants.Q.reuse_damage},
            {label: props.intl.formatMessage({id: "subject.henry.q2-multiplier"}), origin: "Q", value: Constants.Q.reuse_damage, multiplier: Constants.Q.second_hit_multiplier},
            {label: props.intl.formatMessage({id: "subject.henry.q2-additional"}), origin: "Q", value: Constants.Q.reuse_additional_damage, type: {type: "true"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.henry.w-1tick"}), origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.henry.w-max-hit"}, {value: wMax}), origin: "W", value: Constants.W.damage, multiplier: wMax * 100}
        ],
        [{label: props.intl.formatMessage({id: "subject.henry.w-e"}), origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.henry.r1"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.henry.r1-shield"}), origin: "R", value: Constants.R.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.henry.r2"}), origin: "R", value: Constants.R.finish_damage}
        ],
        [{label: "T", origin: "T", value: Constants.T.damage}]
    ]   
})

export default table;