import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const maxQ = Constants.Q.duration / Constants.Q.tick + 1;

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.adriana.q-max-hit"}, {value: maxQ}), skill: "Q", value: Constants.Q.damage, multiplier: maxQ * 100}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adriana.e-fire-damage"}, {value: Constants.E.tick}), skill: "E", value: Constants.E.damage}
        ],
        [
            {label: "R", skill: "R", value: Constants.R.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.adriana.t-dot-sum"}, {value: maxQ}), skill: "T", value: Constants.T.damage}
        ]
    ]
})

export default table;