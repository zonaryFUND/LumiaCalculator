import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";
import { CraverTStrategy } from "./t";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.craver.passive-additional-damage"}), origin: "T", value: CraverTStrategy}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.craver.q1-1hit"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.craver.q1-2hit"}), origin: "Q", value: Constants.Q.damage, multiplier: 200},
            {label: props.intl.formatMessage({id: "subject.craver.q2"}), origin: "Q", value: Constants.Q.enhanced_damage},
            {label: props.intl.formatMessage({id: "subject.craver.q2-additional"}), origin: "Q", value: Constants.Q.additional_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.craver.w1-1hit"}), origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.craver.w1-2hit"}), origin: "W", value: Constants.W.damage, multiplier: 200},
            {label: props.intl.formatMessage({id: "subject.craver.w2-finish"}), origin: "W", value: Constants.W.enhanced_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.craver.e1"}), origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.craver.e2"}), origin: "E", value: Constants.E.enhanced_damage}
        ],
        [
            {label: "R", origin: "R", value: Constants.R.damage}
        ]
    ]
})

export default table;