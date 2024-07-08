import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const maxRHit = Constants.R.duration / Constants.R.tick + 1;

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.qmin"}), skill: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.qmax"}), skill: "Q", value: Constants.Q.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.wmin"}), skill: "W", value: Constants.W.min_damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.wmax"}), skill: "W", value: Constants.W.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.emin"}), skill: "E", value: Constants.E.min_damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.emax"}), skill: "E", value: Constants.E.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.eleven.table.rheal"}), skill: "R", value: Constants.R.heal, type: "heal", target: "self"},
            {label: "R", skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.eleven.table.rmax"}, {value: maxRHit}), skill: "R", value: Constants.R.damage, multiplier: [{basic: maxRHit * 100}]}
        ],
        [{   label: props.intl.formatMessage({id: "subject.eleven.table.theal"}), skill: "T", value: Constants.T.heal, type: "heal", target: "any"}]
    ]
})

export default table;