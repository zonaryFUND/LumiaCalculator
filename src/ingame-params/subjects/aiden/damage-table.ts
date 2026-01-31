import { DamageTableGenerator } from "../type";
import Constants from "./constants";
import { AidenTStrategy } from "./t";

const table: DamageTableGenerator = props => {
    return {
        basicAttack: [
            "standard", 
            {label: props.intl.formatMessage({id: "subject.aiden.hypercharge-aa"}), origin: "T", value: AidenTStrategy, type: {type: "basic", critical: "confirmed"}}
        ],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.aiden.standard-q"}), origin: "Q", value: Constants.Q.damage, type: {type: "basic", critical: "none"}},
                {label: props.intl.formatMessage({id: "subject.aiden.hypercharge-q"}), origin: "Q", value: Constants.Q.range_damage, type: {type: "basic", critical: "none"}}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.aiden.w-initial-min"}), origin: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.aiden.w-initial-max"}), origin: "W", value: Constants.W.damage, multiplier: Constants.W.max_multiplier * 100},
                {label: props.intl.formatMessage({id: "subject.aiden.w-field"}), origin: "W", value: Constants.W.field_damage}
            ],
            [
                {label: "E1", origin: "E", value: Constants.E.damage},
                {label: "E2", origin: "E", value: Constants.E.rush_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.aiden.r1-outer"}), origin: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.aiden.r1-center"}), origin: "R", value: Constants.R.center_damage},
                {label: "R2", origin: "R", value: Constants.R.second_damage}
            ]
        ]   
    }
}
 

export default table;