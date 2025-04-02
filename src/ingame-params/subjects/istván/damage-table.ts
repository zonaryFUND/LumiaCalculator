import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: ["standard"],
        skill: [
            [
                {label: "Q", skill: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.istván.q-enhanced"}), skill: "Q", value: Constants.Q.enhanced_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.istván.w-damage"}), skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.istván.w-shield"}), skill: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.istván.w-heal-min"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}}, 
                {label: props.intl.formatMessage({id: "subject.istván.w-heal-max"}), skill: "W", value: Constants.W.heal, type: {type: "heal", target: "self"}, multiplier: Constants.W.heal_max_multiplier * 100}, 
            ],
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.istván.r-first"}), skill: "R", value: Constants.R.damage},
                {label: props.intl.formatMessage({id: "subject.istván.r-second"}), skill: "R", value: Constants.R.second_damage}
            ]
        ]   
    }   
}

export default table;