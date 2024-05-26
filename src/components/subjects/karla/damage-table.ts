import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        {label: "Q", skill: "Q", value: Constants.Q.damage, type: "basic"},
        {label: props.intl.formatMessage({id: "subject.karla.q-second-target"}), skill: "Q", value: Constants.Q.second_damage, type: "basic"},
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.karla.w"}, {value: 1}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.karla.w"}, {value: 2}), skill: "W", value: Constants.W.damage, multiplier: [{basic: 200 - 1 * Constants.W.damage_reduction}]},
            {label: props.intl.formatMessage({id: "subject.karla.w"}, {value: 3}), skill: "W", value: Constants.W.damage, multiplier: [{basic: 300 - 3 * Constants.W.damage_reduction}]},
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.karla.r-set"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.karla.r-pull"}), skill: "R", value: Constants.R.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.karla.passive-non-charge"}), skill: "T", value: Constants.T.damage},
            {label: props.intl.formatMessage({id: "subject.karla.passive-charge"}), skill: "T", value: Constants.T.full_charge_damage}
        ]
    ]
})

export default table;