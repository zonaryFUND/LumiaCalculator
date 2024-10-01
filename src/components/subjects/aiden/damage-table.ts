import { DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: ["standard", "aiden"],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.aiden.standard-q"}), skill: "Q", value: Constants.Q.damage, type: "basic"},
                {label: props.intl.formatMessage({id: "subject.aiden.hypercharge-q"}), skill: "Q", value: Constants.Q.range_damage, type: "basic"}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.aiden.w-initial-min"}), skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.aiden.w-initial-max"}), skill: "W", value: Constants.W.damage, multiplier: [{basic: Constants.W.max_multiplier * 100}]},
                {label: props.intl.formatMessage({id: "subject.aiden.w-field"}), skill: "W", value: Constants.W.field_damage}
            ],
            [
                {label: "E1", skill: "E", value: Constants.E.damage},
                {label: "E2", skill: "E", value: Constants.E.rush_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.aiden.r1-outer"}), skill: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.aiden.r1-center"}), skill: "R", value: Constants.R.center_damage},
                {label: "R2", skill: "R", value: Constants.R.second_damage}
            ]
        ]   
    }
}
 

export default table;