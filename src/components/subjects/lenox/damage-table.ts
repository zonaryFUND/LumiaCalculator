import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.lenox.q-outer"}), skill: "Q", value: {...Constants.Q.damage, ...Constants.Q.additional_damage}},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lenox.w-swing"}), skill: "W", value: Constants.W.first_damage},
            {label: props.intl.formatMessage({id: "subject.lenox.w-pull"}), skill: "W", value: Constants.W.second_damage}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lenox.r-1hit"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.lenox.r-2hit"}), skill: "R", value: Constants.R.damage, multiplier: [{basic: 200}]},
        ],
        [{label: props.intl.formatMessage({id: "subject.lenox.passive-shield"}), skill: "T", value: Constants.T.shield, type: "shield", target: "self"}]
    ]   
})

export default table;