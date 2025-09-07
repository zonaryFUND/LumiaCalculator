import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.lenox.q-outer"}), origin: "Q", value: {...Constants.Q.damage, ...Constants.Q.additional_damage}},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lenox.w-swing"}), origin: "W", value: Constants.W.first_damage},
            {label: props.intl.formatMessage({id: "subject.lenox.w-pull"}), origin: "W", value: Constants.W.second_damage}
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lenox.r-1hit"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.lenox.r-2hit"}), origin: "R", value: Constants.R.damage, multiplier: 200},
        ],
        [{label: props.intl.formatMessage({id: "subject.lenox.passive-shield"}), origin: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}]
    ]   
})

export default table;