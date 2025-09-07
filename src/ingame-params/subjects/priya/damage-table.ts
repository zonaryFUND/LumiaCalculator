import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.priya.q-full-bloom"}), origin: "Q", value: Constants.Q.bloomed_damage}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.priya.w-full-bloom"}), origin: "W", value: Constants.W.shield, type: {type: "shield", target: "any"}}
        ],
        [
            {label: "E", origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.priya.e-multiple-hits"}, {value: 2}), origin: "E", value: Constants.E.damage, multiplier: 200},
            {label: props.intl.formatMessage({id: "subject.priya.e-multiple-hits"}, {value: 3}), origin: "E", value: Constants.E.damage, multiplier: 300}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.priya.r-outward"}), origin: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.priya.r-return"}), origin: "R", value: Constants.R.echo_damage},
            {label: props.intl.formatMessage({id: "subject.priya.r-heal"}), origin: "R", value: Constants.R.heal, type: {type: "heal", target: "any"}}
        ]
    ]   
})

export default table;