import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.sua.passive-additional"}), skill: "T", value: Constants.T.damage},
        {label: props.intl.formatMessage({id: "subject.sua.passive-heal"}), skill: "T", value: Constants.T.damage, damageDependentHeal: Constants.T.heal},
        {label: props.intl.formatMessage({id: "subject.sua.passive-additional-aoe"}), skill: "T", value: Constants.T.aoe_damage},
        {label: props.intl.formatMessage({id: "subject.sua.passive-heal-aoe"}), skill: "T", value: Constants.T.aoe_damage, damageDependentHeal: Constants.T.heal}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.sua.q-bookmark"}), skill: "Q", value: Constants.Q.bookmark_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.sua.w-shield"}), skill: "W", value: Constants.W.shield, type: {type: "shield", target: "any"}},
            {label: props.intl.formatMessage({id: "subject.sua.w-damage"}), skill: "W", value: Constants.W.damage}
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.sua.e-bookmark"}), skill: "E", value: Constants.E.bookmark_damage},
            {label: props.intl.formatMessage({id: "subject.sua.e-heal-min"}), skill: "E", value: Constants.E.heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.sua.e-heal-max"}), skill: "E", value: Constants.E.heal, type: {type: "heal", target: "self"}, multiplier: Constants.E.heal_max_multiplier * 100},
        ],
        [
            {label: "RQ", skill: "R", value: Constants.RQ.damage},
            {label: props.intl.formatMessage({id: "subject.sua.rq-bookmark"}), skill: "R", value: Constants.RQ.bookmark_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.sua.rw-shield"}), skill: "R", value: Constants.RW.shield, type: {type: "shield", target: "any"}},
            {label: props.intl.formatMessage({id: "subject.sua.rw-damage"}), skill: "R", value: Constants.RW.damage}
        ],
        [
            {label: "RE", skill: "R", value: Constants.RE.damage},
            {label: props.intl.formatMessage({id: "subject.sua.re-bookmark"}), skill: "R", value: Constants.RE.bookmark_damage},
            {label: props.intl.formatMessage({id: "subject.sua.re-heal-min"}), skill: "R", value: Constants.RE.heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.sua.re-heal-max"}), skill: "R", value: Constants.RE.heal, type: {type: "heal", target: "self"}, multiplier: Constants.RE.heal_max_multiplier * 100},
        ]
    ]   
})

export default table;