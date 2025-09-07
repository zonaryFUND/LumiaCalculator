import { weaponTypeIDOf } from "app-types/subject-dynamic/config";
import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const weaponType = weaponTypeIDOf(props.config);

    return {
        basicAttack: [
            "standard",
            weaponType == "DualSword" ? {label: props.intl.formatMessage({id: "subject.jackie.w-dualsword-attack"}), origin: "W", value: {attack: Constants.W.dualsword_attack_ratio, basicAttackAmp: 100}, type: {type: "basic"}} : undefined,
            {label: props.intl.formatMessage({id: "subject.jackie.w-additional"}), origin: "W", value: Constants.W.damage}
        ].filter(v => v) as SubjectDamageTableUnit[],
        skill: [
            [
                {label: "Q", origin: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.jackie.q-heal"}), origin: "Q", value: Constants.Q.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.Q.heal},
                {label: props.intl.formatMessage({id: "subject.jackie.q-enhanced"}), origin: "Q", value: Constants.Q.damage, multiplier: 100 + Constants.Q.max_stack_target_additional_damage},
                {label: props.intl.formatMessage({id: "subject.jackie.q-enhanced-heal"}), origin: "Q", value: Constants.Q.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.Q.heal, multiplier: 100 + Constants.Q.max_stack_target_additional_damage}
            ],
            [{label: "E", origin: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.jackie.r-min"}), origin: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.jackie.r-min-heal"}), origin: "R", value: Constants.R.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.R.heal},
                {label: props.intl.formatMessage({id: "subject.jackie.r-max"}), origin: "R", value: Constants.R.damage, multiplier: Constants.R.finish_multiplier_max * 100},
                {label: props.intl.formatMessage({id: "subject.jackie.r-max-heal"}), origin: "R", value: Constants.R.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.R.heal, multiplier: Constants.R.finish_multiplier_max * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.jackie.passive-dot-sum"}), origin: "T", value: Constants.T.bleeding_damage},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-dot-sum-max"}, {value: Constants.T.max_bleeding}), origin: "T", value: Constants.T.bleeding_damage, multiplier: Constants.T.max_bleeding * 100},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-additional"}), origin: "T", value: Constants.T.damage},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-heal-min"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-heal-max"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}, multiplier: Constants.T.max_heal_multiplier * 100}

            ]
        ]   
    }   
    }

export default table;