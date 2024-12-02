import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.shoichi.passive-additional"}), skill: "T", value: Constants.T.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.shoichi.r-bag"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.shoichi.r-dagger"}), skill: "R", value: Constants.R.knife_damage}
        ],
        [{label: props.intl.formatMessage({id: "subject.shoichi.passive-dagger-throw"}), skill: "T", value: Constants.T.knife_damage}]
    ]   
})

export default table;