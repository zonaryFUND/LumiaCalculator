import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const maxQ = Constants.Q.duration / Constants.Q.tick + 1;

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.adriana.q-max-hit"}, {value: maxQ}), origin: "Q", value: Constants.Q.damage, multiplier: maxQ * 100}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adriana.e-fire-damage"}, {value: Constants.E.tick}), origin: "E", value: Constants.E.damage}
        ],
        [
            {label: "R", origin: "R", value: Constants.R.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adriana.t-dot-sum"}, {value: maxQ}), origin: "T", value: Constants.T.damage}
        ]
    ]
})

export default table;