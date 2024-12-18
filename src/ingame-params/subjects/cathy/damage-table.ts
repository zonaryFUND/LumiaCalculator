import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";
import extractWeaponTypeID from "app-types/subject-dynamic/config/extract-weapon-type-id";

const table: DamageTableGenerator = props => {
    const weaponType = extractWeaponTypeID(props.config);

    return {
        basicAttack: [
            "standard",
            weaponType == "DualSword" ? {label: props.intl.formatMessage({id: "subject.cathy.q-dualsword-attack"}), skill: "Q", value: {attack: Constants.Q.dual_sword}, type: {type: "basic"}} : undefined,
            {label: props.intl.formatMessage({id: "subject.cathy.q-additional-damage"}), skill: "Q", value: Constants.Q.additional_damage}
        ].filter(v => v) as SubjectDamageTableUnit[],
        skill: [
            [{label: "Q", skill: "Q", value: Constants.Q.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.cathy.w-inner"}), skill: "W", value: Constants.W.inner_damage},
                {label: props.intl.formatMessage({id: "subject.cathy.w-outer"}), skill: "W", value: Constants.W.outer_damage}
            ],
            [
                {label: "E", skill: "E", value: Constants.E.damage},
                {label: props.intl.formatMessage({id: "subject.cathy.e-stun-additional"}), skill: "E", value: Constants.E.knockback_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.cathy.r-heal-per-sec"}), skill: "R", value: Constants.R.heal, type: {type: "heal", target: "any"}},
                {label: props.intl.formatMessage({id: "subject.cathy.r-heal-max"}, {value: Constants.R.heal_duration}), skill: "R", value: Constants.R.heal, type: {type: "heal", target: "any"}, multiplier: Constants.R.heal_duration * 100},
                {label: props.intl.formatMessage({id: "subject.cathy.r-min"}), skill: "R", value: Constants.R.min_damage},
                {label: props.intl.formatMessage({id: "subject.cathy.r-max"}), skill: "R", value: Constants.R.min_damage, multiplier: Constants.R.max_damage_ratio * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.cathy.passive-wound"}), skill: "T", value: Constants.T.wound, type: {type: "true"}},
                {label: props.intl.formatMessage({id: "subject.cathy.passive-critical-wound"}), skill: "T", value: Constants.T.critical_wound, type: {type: "true"}},
                {label: props.intl.formatMessage({id: "subject.cathy.passive-shield"}), skill: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}
            ]
        ]
    }
}

export default table;