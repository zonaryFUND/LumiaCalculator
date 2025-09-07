import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const eMax = Constants.E.glass_additional_max / Constants.E.glass_additional_damage + 1
const rMax = Constants.R.glass_additional_max / Constants.R.glass_additional_damage;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.tazia.passive-additional"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.tazia.q-stiletto"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.tazia.q-spada-hit"}), origin: "Q", value: Constants.Q.spada_damage},
            {label: props.intl.formatMessage({id: "subject.tazia.q-spada-blast"}), origin: "Q", value: Constants.Q.spada_blast_damage}
        ],
        [{label: "W", origin: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.tazia.e-shield"}), origin: "E", value: Constants.E.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.tazia.e-shield-max"}, {value: eMax}), origin: "E", value: Constants.E.shield, type: {type: "shield", target: "self"}, multiplier: Constants.E.glass_additional_max + 100},
            {label: props.intl.formatMessage({id: "subject.tazia.e-damage"}), origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.tazia.e-damage-max"}, {value: eMax}), origin: "E", value: Constants.E.damage, multiplier: Constants.E.glass_additional_max + 100}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.tazia.r-appear"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.tazia.r-blast"}), origin: "R", value: Constants.R.blast_damage},
            {label: props.intl.formatMessage({id: "subject.tazia.r-blast-max"}, {value: rMax}), origin: "R", value: Constants.R.blast_damage, multiplier: Constants.R.glass_additional_max + 100}
        ]
    ]   
})

export default table;