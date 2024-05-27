import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.chloe.nina-aa"}), skill: "T", value: {attack: 100}, type: "summoned"}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.chloe.w-string-damage-per-sec"}), skill: "W", value: Constants.W.damage, type: "true"},
            {label: props.intl.formatMessage({id: "subject.chloe.w-string-damage-max"}, {value: Constants.W.duration}), skill: "W", value: Constants.W.damage, type: "true", multiplier: [{basic: Constants.W.duration * 100}]},
            {label: props.intl.formatMessage({id: "subject.chloe.w-blade"}), skill: "W", value: Constants.W.drop_damage},
            {label: props.intl.formatMessage({id: "subject.chloe.w-nina"}), skill: "W", value: Constants.W.nina_damage}
        ],
        [
            {label: "E1", skill: "E", value: Constants.E.first_damage},
            {label: "E2", skill: "E", value: Constants.E.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.chloe.r-min"}), skill: "R", value: Constants.R.damage, type: "true"},
            {label: props.intl.formatMessage({id: "subject.chloe.r-max"}), skill: "R", value: Constants.R.damage, multiplier: [{basic: Constants.R.damage_max_multipler * 100}], type: "true"},
        ],
        [{label: props.intl.formatMessage({id: "subject.chloe.passive-nina"}), skill: "T", value: Constants.T.damage}]
    ]
})

export default table;