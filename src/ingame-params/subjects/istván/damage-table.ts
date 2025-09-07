import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: ["standard"],
        skill: [
            [
                {label: "Q", origin: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.istván.q-enhanced"}), origin: "Q", value: Constants.Q.variable_damage},
                {label: props.intl.formatMessage({id: "subject.istván.q-enhanced-lowtarget"}), origin: "Q", value: Constants.Q.enhanced_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.istván.w-damage"}), origin: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.istván.w-shield"}), origin: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.istván.w-enhanced-damage"}), origin: "W", value: Constants.W.variable_damage},
                {label: props.intl.formatMessage({id: "subject.istván.w-heal-min"}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}}, 
                {label: props.intl.formatMessage({id: "subject.istván.w-heal-max"}), origin: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.W.heal_max_multiplier * 100}, 
            ],
            [
                {label: "E", origin: "E", value: Constants.E.damage},
                {label: props.intl.formatMessage({id: "subject.istván.e-enhanced"}), origin: "E", value: Constants.E.variable_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.istván.r-first"}), origin: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.istván.r-second"}), origin: "R", value: Constants.R.second_damage}
            ]
        ]   
    }   
}

export default table;