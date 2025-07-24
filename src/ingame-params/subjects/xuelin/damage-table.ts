import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const qLeaveMax = Constants.Q.duration / Constants.Q.tick;
const qRetrieveMax = Constants.Q.retrieve_duration / Constants.Q.retrieve_tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.xuelin.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.xuelin.q-throw"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.q-dot-1hit"}), skill: "Q", value: Constants.Q.dot_damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.q-dot-max-hit"}, {value: qLeaveMax}), skill: "Q", value: Constants.Q.dot_damage, multiplier: qLeaveMax * 100},
            {label: props.intl.formatMessage({id: "subject.xuelin.q-retrieve-dot-1hit"}), skill: "Q", value: Constants.Q.retrieve_dot_damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.q-retrieve-dot-max-hit"}, {value: qRetrieveMax}), skill: "Q", value: Constants.Q.retrieve_dot_damage, multiplier: qRetrieveMax * 100},
        ],
        [
             {label: "W", skill: "W", value: Constants.W.damage},
             {label: props.intl.formatMessage({id: "subject.xuelin.w-enhanced"}), skill: "W", value: Constants.W.enhanced_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.xuelin.e-through"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.e-chase"}), skill: "E", value: Constants.E.second_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.xuelin.r-first"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.r-additional"}), skill: "R", value: Constants.R.additional_damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.r-enhanced"}), skill: "R", value: Constants.R.enhance_damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.r-e-chase"}), skill: "R", value: Constants.R.e_chase_damage},
            {label: props.intl.formatMessage({id: "subject.xuelin.r-e-chase-same-target"}), skill: "R", value: Constants.R.e_chase_damage, multiplier: 100 - Constants.R.second_chase_decline},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.xuelin.t-heal"}), skill: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}},
        ]
    ]
})

export default table;