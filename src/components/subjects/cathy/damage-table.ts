import { WeaponTypeID } from "app-types/equipment/weapon";
import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: [
            "standard",
            props.weaponType == "dual_swords" ? {label: props.intl.formatMessage({id: "subject.cathy.q-dualsword-attack"}), skill: "Q", value: {attack: Constants.Q.dual_sword}, type: "basic"} : undefined,
            {label: props.intl.formatMessage({id: "subject.cathy.q-additional-damage"}), skill: "Q", value: Constants.Q.additional_damage}
        ].filter(v => v) as SkillValueProps[],
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
                {label: props.intl.formatMessage({id: "subject.cathy.r-heal-per-sec"}), skill: "R", value: Constants.R.heal, type: "heal", target: "any"},
                {label: props.intl.formatMessage({id: "subject.cathy.r-heal-max"}, {value: Constants.R.heal_duration}), skill: "R", value: Constants.R.heal, type: "heal", target: "any", multiplier: [{basic: Constants.R.heal_duration * 100}]},
                {label: props.intl.formatMessage({id: "subject.cathy.r-min"}), skill: "R", value: Constants.R.min_damage},
                {label: props.intl.formatMessage({id: "subject.cathy.r-max"}), skill: "R", value: Constants.R.min_damage, multiplier: [{basic: Constants.R.max_damage_ratio * 100}]}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.cathy.passive-wound"}), skill: "T", value: Constants.T.wound, type: "true"},
                {label: props.intl.formatMessage({id: "subject.cathy.passive-critical-wound"}), skill: "T", value: Constants.T.critical_wound, type: "true"},
                {label: props.intl.formatMessage({id: "subject.cathy.passive-shield"}), skill: "T", value: Constants.T.shield, type: "shield", target: "self"}
            ]
        ]
    }
}

export default table;