import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const eMax = Constants.E.glass_additional_max / Constants.E.glass_additional_damage + 1
const rMax = Constants.R.glass_additional_max / Constants.R.glass_additional_damage;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.tazia.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.tazia.q-stiletto"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.tazia.q-spada-hit"}), skill: "Q", value: Constants.Q.spada_damage},
            {label: props.intl.formatMessage({id: "subject.tazia.q-spada-blast"}), skill: "Q", value: Constants.Q.spada_blast_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.tazia.e-shield"}), skill: "E", value: Constants.E.shield, type: "shield"},
            {label: props.intl.formatMessage({id: "subject.tazia.e-shield-max"}, {value: eMax}), skill: "E", value: Constants.E.shield, type: "shield", multiplier: [{basic: Constants.E.glass_additional_max + 100}]},
            {label: props.intl.formatMessage({id: "subject.tazia.e-damage"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.tazia.e-damage-max"}, {value: eMax}), skill: "E", value: Constants.E.damage, multiplier: [{basic: Constants.E.glass_additional_max + 100}]}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.tazia.r-appear"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.tazia.r-blast"}), skill: "R", value: Constants.R.blast_damage},
            {label: props.intl.formatMessage({id: "subject.tazia.r-blast-max"}, {value: rMax}), skill: "R", value: Constants.R.blast_damage, multiplier: [{basic: Constants.R.glass_additional_max + 100}]}
        ]
    ]   
})

export default table;