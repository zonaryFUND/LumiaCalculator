import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";
import { w3Count } from "./w";

const table: DamageTableGenerator = props => {
    const w3 = w3Count(props.status.attackSpeed.multiplier);

    return {
        basicAttack: [
            "standard",
        ],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.hisui.q-first"}), skill: "Q", value: Constants.Q.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.q-second"}), skill: "Q", value: Constants.Q.second_damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.hisui.w1-first"}), skill: "W", value: Constants.W.W1.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-second"}), skill: "W", value: Constants.W.W1.second_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-shield"}), skill: "W", value: Constants.W.W1.shield, type: {type: "shield", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-shield-max"}), skill: "W", value: Constants.W.W1.shield, type: {type: "shield", target: "self"}, multiplier: 100 + Constants.W.W1.shield_enhance},
                {label: "W2", skill: "W", value: Constants.W.W2.damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w2-second-last-target"}), skill: "W", value: Constants.W.W2.final_target_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-1hit"}), skill: "W", value: Constants.W.W3.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-allhit"}, {value: w3}), skill: "W", value: Constants.W.W3.first_damage, multiplier: 100 * w3},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-1hit-heal"}), skill: "W", value: Constants.W.W3.first_damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.W.W3.first_heal},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-allhit-heal"}, {value: w3}), skill: "W", value: Constants.W.W3.first_damage, type: {type: "heal", target: "self"}, multiplier: 100 * w3, damageDependentHeal: Constants.W.W3.first_heal},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-second"}), skill: "W", value: Constants.W.W3.second_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-second-heal"}), skill: "W", value: Constants.W.W3.second_damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.W.W3.second_heal},
            ],
            [
                {label: "E", skill: "E", value: Constants.E.damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.hisui.r-additional"}), skill: "T", value: Constants.R.additional_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-first"}), skill: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-first-2hit"}), skill: "R", value: Constants.R.first_damage, multiplier: 200},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-second"}), skill: "R", value: Constants.R.second_damage, type: {type: "true"}}
            ]
        ]   
    }
}

export default table;