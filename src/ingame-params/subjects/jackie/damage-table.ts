import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";
import extractWeaponTypeID from "app-types/subject-dynamic/config/extract-weapon-type-id";

const table: DamageTableGenerator = props => {
    const weaponType = extractWeaponTypeID(props.config);

    return {
        basicAttack: [
            "standard",
            weaponType == "DualSword" ? {label: props.intl.formatMessage({id: "subject.jackie.w-dualsword-attack"}), skill: "W", value: {attack: Constants.W.dualsword_attack_ratio, basicAttackAmp: 100}, type: {type: "basic"}} : undefined,
            {label: props.intl.formatMessage({id: "subject.jackie.w-additional"}), skill: "W", value: Constants.W.damage}
        ].filter(v => v) as SubjectDamageTableUnit[],
        skill: [
            [
                {label: "Q", skill: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.jackie.q-heal"}), skill: "Q", value: Constants.Q.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.Q.heal},
                {label: props.intl.formatMessage({id: "subject.jackie.q-enhanced"}), skill: "Q", value: Constants.Q.damage, multiplier: 100 + Constants.Q.max_stack_target_additional_damage},
                {label: props.intl.formatMessage({id: "subject.jackie.q-enhanced-heal"}), skill: "Q", value: Constants.Q.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.Q.heal, multiplier: 100 + Constants.Q.max_stack_target_additional_damage}
            ],
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.jackie.r-min"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.jackie.r-min-heal"}), skill: "R", value: Constants.R.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.R.heal},
                {label: props.intl.formatMessage({id: "subject.jackie.r-max"}), skill: "R", value: Constants.R.damage, multiplier: Constants.R.finish_multiplier_max * 100},
                {label: props.intl.formatMessage({id: "subject.jackie.r-max-heal"}), skill: "R", value: Constants.R.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.R.heal, multiplier: Constants.R.finish_multiplier_max * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.jackie.passive-dot-sum"}), skill: "T", value: Constants.T.bleeding_damage},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-dot-sum-max"}, {value: Constants.T.max_bleeding}), skill: "T", value: Constants.T.bleeding_damage, multiplier: Constants.T.max_bleeding * 100},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-additional"}), skill: "T", value: Constants.T.damage},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-heal-min"}), skill: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.jackie.passive-heal-max"}), skill: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}, multiplier: Constants.T.max_heal_multiplier * 100}

            ]
        ]   
    }   
    }

export default table;