import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.leni.q-damage"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.leni.q-heal"}), skill: "Q", value: Constants.Q.heal, type: {type: "heal", target: "any"}},
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.leni.e-damage"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.leni.e-shield"}), skill: "E", value: Constants.E.shield, type: {type: "shield", target: "any"}}
        ],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: props.intl.formatMessage({id: "subject.leni.passive-additional"}), skill: "T", value: Constants.T.damage}]
    ]   
})

export default table;