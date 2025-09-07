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
                {label: props.intl.formatMessage({id: "subject.hisui.q-first"}), origin: "Q", value: Constants.Q.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.q-second"}), origin: "Q", value: Constants.Q.second_damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.hisui.w1-first"}), origin: "W", value: Constants.W.W1.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-second"}), origin: "W", value: Constants.W.W1.second_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-shield"}), origin: "W", value: Constants.W.W1.shield, type: {type: "shield", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-shield-max"}), origin: "W", value: Constants.W.W1.shield, type: {type: "shield", target: "self"}, multiplier: 100 + Constants.W.W1.shield_enhance},
                {label: "W2", origin: "W", value: Constants.W.W2.damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w2-second-last-target"}), origin: "W", value: Constants.W.W2.final_target_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-1hit"}), origin: "W", value: Constants.W.W3.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-allhit"}, {value: w3}), origin: "W", value: Constants.W.W3.first_damage, multiplier: 100 * w3},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-1hit-heal"}), origin: "W", value: Constants.W.W3.first_damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.W.W3.first_heal},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-allhit-heal"}, {value: w3}), origin: "W", value: Constants.W.W3.first_damage, type: {type: "heal", target: "self"}, multiplier: 100 * w3, damageDependentHeal: Constants.W.W3.first_heal},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-second"}), origin: "W", value: Constants.W.W3.second_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-second-heal"}), origin: "W", value: Constants.W.W3.second_damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.W.W3.second_heal},
            ],
            [
                {label: "E", origin: "E", value: Constants.E.damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.hisui.r-additional"}), origin: "T", value: Constants.R.additional_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-first"}), origin: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-first-2hit"}), origin: "R", value: Constants.R.first_damage, multiplier: 200},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-second"}), origin: "R", value: Constants.R.second_damage, type: {type: "true"}}
            ]
        ]   
    }
}

export default table;