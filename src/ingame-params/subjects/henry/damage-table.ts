import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const wMax = Constants.W.duration / Constants.W.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.henry.q1-multiplier"}), skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.second_hit_multiplier},
            {label: props.intl.formatMessage({id: "subject.henry.q1-additional"}), skill: "Q", value: Constants.Q.additional_damage, type: {type: "true"}},
            {label: "Q2", skill: "Q", value: Constants.Q.reuse_damage},
            {label: props.intl.formatMessage({id: "subject.henry.q2-multiplier"}), skill: "Q", value: Constants.Q.reuse_damage, multiplier: Constants.Q.second_hit_multiplier},
            {label: props.intl.formatMessage({id: "subject.henry.q2-additional"}), skill: "Q", value: Constants.Q.reuse_additional_damage, type: {type: "true"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.henry.w-1tick"}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.henry.w-max-hit"}, {value: wMax}), skill: "W", value: Constants.W.damage, multiplier: wMax * 100}
        ],
        [{label: props.intl.formatMessage({id: "subject.henry.w-e"}), skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.henry.r1"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.henry.r1-shield"}), skill: "R", value: Constants.R.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.henry.r2"}), skill: "R", value: Constants.R.finish_damage}
        ],
        [{label: "T", skill: "T", value: Constants.T.damage}]
    ]   
})

export default table;