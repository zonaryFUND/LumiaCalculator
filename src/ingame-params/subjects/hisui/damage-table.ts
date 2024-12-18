import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const w3Count = Constants.W.W3.count;

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.hisui.r-additional"}), skill: "T", value: Constants.R.additional_damage}
        ],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.hisui.q-first"}), skill: "Q", value: Constants.Q.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.q-second"}), skill: "Q", value: Constants.Q.second_damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.hisui.w1-first"}), skill: "W", value: Constants.W.W1.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w1-second"}), skill: "W", value: Constants.W.W1.second_damage},
                {label: "W2", skill: "W", value: Constants.W.W2.damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w2-w2-second-last-target"}), skill: "W", value: Constants.W.W2.final_target_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-1hit"}), skill: "W", value: Constants.W.W3.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-first-maxhit"}, {value: w3Count}), skill: "W", value: Constants.W.W3.first_damage, multiplier: 100 * w3Count},
                {label: props.intl.formatMessage({id: "subject.hisui.w3-second"}), skill: "W", value: Constants.W.W3.second_damage},
            ],
            [
                {label: "E", skill: "E", value: Constants.E.damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-first"}), skill: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.hisui.r-reuse-second"}), skill: "R", value: Constants.R.second_damage}
            ]
        ]   
    }
}

export default table;