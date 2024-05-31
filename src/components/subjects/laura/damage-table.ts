import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.laura.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.Q1_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.Q2_damage},
            {label: "Q3", skill: "Q", value: Constants.Q.Q3_first_damage},
            {label: props.intl.formatMessage({id: "subject.laura.q3-second"}), skill: "Q", value: Constants.Q.Q3_second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.laura.w-hit"}), skill: "W", value: Constants.W.hit_damage},
            {label: props.intl.formatMessage({id: "subject.laura.w-launch"}), skill: "W", value: Constants.W.target_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.laura.r-hit"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.laura.r-landing"}), skill: "R", value: Constants.R.second_damage}
        ]
    ]   
})

export default table;