import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.rozzi.passive-first"}), skill: "T", value: Constants.T.first_damage, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.rozzi.passive-second"}), skill: "T", value: Constants.T.second_damage, type: {type: "basic"}}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.rozzi.r-blast"}), skill: "R", value: {targetMaxHP: Constants.R.additional_damage}, type: {type: "true"}}
        ]
    ]   
})

export default table;