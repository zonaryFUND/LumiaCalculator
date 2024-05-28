import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.felix.passive-second-aa"}), skill: "T", value: Constants.T.damage, type: "basic"}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.felix.q-enhanced"}), skill: "Q", value: Constants.Q.enhanced_damage},
            {label: props.intl.formatMessage({id: "subject.felix.q-enhanced-true"}), skill: "Q", value: Constants.Q.stack_damage_conversion, type: "true"},
            {label: props.intl.formatMessage({id: "subject.felix.q-enhanced-true-max"}, {value: Constants.T.max_stack}), skill: "Q", value: Constants.Q.stack_damage_conversion, multiplier: [{basic: Constants.T.max_stack * 100}], type: "true"}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.felix.w-enhanced"}), skill: "W", value: Constants.W.enhanced_damage}
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.felix.e-enhanced"}), skill: "E", value: Constants.E.enhanced_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.felix.r-min"}), skill: "R", value: Constants.R.min_damage},
            {label: props.intl.formatMessage({id: "subject.felix.r-max"}), skill: "R", value: Constants.R.max_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.felix.passive-shield-min"}), skill: "T", value: {attack: Constants.T.shield.effect.attack}, type: "shield"},
            {label: props.intl.formatMessage({id: "subject.felix.passive-shield-max"}, {value: Constants.T.max_stack}), skill: "T", value: {base: Constants.T.shield.effect.consumedStack * Constants.T.max_stack, attack: Constants.T.shield.effect.attack}, type: "shield"},
        ]
    ]   
})

export default table;