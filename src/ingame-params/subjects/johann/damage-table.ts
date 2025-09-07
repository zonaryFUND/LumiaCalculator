import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const enhancedESum = {
    base: Constants.E.damage.base.map((v, i) => Constants.E.enhanced_damage.base[i]),
    amp: Constants.E.damage.amp + Constants.E.enhanced_damage.amp
}

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.johann.q-damage"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.johann.q-heal"}), origin: "Q", value: Constants.Q.heal, type: {type: "heal", target: "any"}},
            {label: props.intl.formatMessage({id: "subject.johann.q-enhanced-damage"}), origin: "Q", value: Constants.Q.enhanced_damage},
            {label: props.intl.formatMessage({id: "subject.johann.q-enhanced-heal"}), origin: "Q", value: Constants.Q.enhanced_heal, type: {type: "heal", target: "any"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.johann.e-finish-damage"}), origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.johann.e-enhanced-shield"}), origin: "E", value: Constants.E.shield, type: {type: "shield", target: "any"}},
            {label: props.intl.formatMessage({id: "subject.johann.e-enhanced-damage"}), origin: "E", value: Constants.E.enhanced_damage},
            {label: props.intl.formatMessage({id: "subject.johann.e-enhanced-damage-sum"}), origin: "E", value: enhancedESum},
            {label: props.intl.formatMessage({id: "subject.johann.e-target-movement-speed"}), origin: "E", value: Constants.E.movement_speed.effect, type: {type: "misc", percentExpression: true}},
            {label: props.intl.formatMessage({id: "subject.johann.e-chase-movement-speed"}), origin: "E", value: Constants.E.chase_movement_speed, type: {type: "misc", percentExpression: true}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.johann.r-damage"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.johann.r-first-heal"}), origin: "R", value: Constants.R.heal, type: {type: "heal", target: "any"}},
            {label: props.intl.formatMessage({id: "subject.johann.r-heal-on-time"}), origin: "R", value: Constants.R.heal_per_sec, type: {type: "heal", target: "any"}},
            {label: props.intl.formatMessage({id: "subject.johann.r-heal-on-time-max-hit"}, {value: Constants.R.duration}), origin: "R", value: Constants.R.heal_per_sec, type: {type: "heal", target: "any"}, multiplier: Constants.R.duration * 100}
        ]
    ]   
})

export default table;