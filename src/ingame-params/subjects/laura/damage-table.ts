import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.laura.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.laura.w-damage"}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.laura.w-heal"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.laura.r-first"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.laura.r-second"}), skill: "R", value: Constants.R.second_damage},
            {label: props.intl.formatMessage({id: "subject.laura.r-shield"}), skill: "R", value: Constants.R.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.laura.r-additional-shield-1"}), skill: "R", value: Constants.R.additional_shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.laura.r-additional-shield-2"}), skill: "R", value: Constants.R.additional_shield, type: {type: "shield", target: "self"}, multiplier: 200}
        ]
    ]   
})

export default table;