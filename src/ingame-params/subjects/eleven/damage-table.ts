import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const maxRHit = Constants.R.duration / Constants.R.tick + 1;

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.qmin"}), origin: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.qmax"}), origin: "Q", value: Constants.Q.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.wmin"}), origin: "W", value: Constants.W.min_damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.wmax"}), origin: "W", value: Constants.W.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.emin"}), origin: "E", value: Constants.E.min_damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.emax"}), origin: "E", value: Constants.E.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.rheal"}), origin: "R", value: Constants.R.heal, type: {type: "heal", target: "self"}},
            {label: "R", origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.rmax"}, {value: maxRHit}), origin: "R", value: Constants.R.damage, multiplier: maxRHit * 100}
        ],
        [{   label: props.intl.formatMessage({id: "subject.eleven.table.theal"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "any"}}]
    ]
})

export default table;