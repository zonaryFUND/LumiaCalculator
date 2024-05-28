import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.priya.q-full-bloom"}), skill: "Q", value: Constants.Q.bloomed_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.priya.w-full-bloom"}), skill: "W", value: Constants.W.shield, type: "shield"}
        ],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.priya.e-multiple-hits"}, {value: 2}), skill: "E", value: Constants.E.damage, multiplier: [{basic: 200}]},
            {label: props.intl.formatMessage({id: "subject.priya.e-multiple-hits"}, {value: 3}), skill: "E", value: Constants.E.damage, multiplier: [{basic: 300}]}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.priya.r-outward"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.priya.r-return"}), skill: "R", value: Constants.R.echo_damage},
            {label: props.intl.formatMessage({id: "subject.priya.r-heal"}), skill: "R", value: Constants.R.heal}
        ]
    ]   
})

export default table;