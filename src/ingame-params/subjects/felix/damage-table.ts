import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.felix.passive-second-aa" }), origin: "T", value: Constants.T.damage, type: { type: "basic" } }
    ],
    skill: [
        [
            { label: "Q", origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.felix.q-enhanced" }), origin: "Q", value: Constants.Q.enhanced_damage },
            { label: props.intl.formatMessage({ id: "subject.felix.q-enhanced-true" }), origin: "Q", value: Constants.Q.stack_damage_conversion, type: { type: "true" } },
            { label: props.intl.formatMessage({ id: "subject.felix.q-enhanced-true-max" }, { value: Constants.T.max_stack }), origin: "Q", value: Constants.Q.stack_damage_conversion, multiplier: Constants.T.max_stack * 100, type: { type: "true" } }
        ],
        [
            { label: "W", origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.felix.w-enhanced" }), origin: "W", value: Constants.W.enhanced_damage }
        ],
        [
            { label: "E", origin: "E", value: Constants.E.damage },
            { label: props.intl.formatMessage({ id: "subject.felix.e-enhanced" }), origin: "E", value: Constants.E.enhanced_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.felix.r-min" }), origin: "R", value: Constants.R.min_damage },
            { label: props.intl.formatMessage({ id: "subject.felix.r-max" }), origin: "R", value: Constants.R.max_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.felix.passive-shield-min" }), origin: "T", value: { attack: Constants.T.shield.effect.attack }, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.felix.passive-shield-max" }, { value: Constants.T.max_stack }), origin: "T", value: { base: Constants.T.shield.effect.consumedStack * Constants.T.max_stack, attack: Constants.T.shield.effect.attack }, type: { type: "shield", target: "self" } },
        ]
    ]
})

export default table;