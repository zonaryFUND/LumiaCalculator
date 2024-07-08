import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.kenneth.e-additional"}), skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.kenneth.q-max-stack"}), skill: "Q", value: Constants.Q.damage, multiplier: [{basic: 100 + Constants.Q.max_stack_damage}]}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.kenneth.w-damage-reduction"}), skill: "W", value: Constants.W.damage_reduction, type: "ratio"},
            {label: props.intl.formatMessage({id: "subject.kenneth.w-shield"}), skill: "W", value: Constants.W.shield, type: "shield", target: "self"}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.kenneth.r-swing-up"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.kenneth.r-midair-1hit"}), skill: "R", value: Constants.R.second_damage},
            {label: props.intl.formatMessage({id: "subject.kenneth.r-midair-2hit"}), skill: "R", value: Constants.R.second_damage, multiplier: [{basic: 200}]},
            {label: props.intl.formatMessage({id: "subject.kenneth.r-swing-down"}), skill: "R", value: Constants.R.third_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.kenneth.passive-additional"}), skill: "T", value: Constants.T.damage},
            {label: props.intl.formatMessage({id: "subject.kenneth.et-conversion"}), skill: "T", value: Constants.T.damage, multiplier: [{basic: Constants.E.damage_conversion}], type: "true"},
            {label: props.intl.formatMessage({id: "subject.kenneth.t-heal"}), skill: "T", value: Constants.T.heal, type: "kenneth-heal"}
        ]
    ]
})

export default table;