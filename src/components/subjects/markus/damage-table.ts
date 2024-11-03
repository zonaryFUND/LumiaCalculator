import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.markus.q-additional"}), skill: "Q", value: Constants.Q.damage},
        {label: props.intl.formatMessage({id: "subject.markus.q-additional-heal"}), skill: "Q", value: Constants.Q.damage, type: {type: "heal", target: "self"}, damageDependentHeal: Constants.Q.heal},
        {label: props.intl.formatMessage({id: "subject.markus.q-additional-max-hit"}, {value: Constants.Q.count}), skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.count * 100},
        {label: props.intl.formatMessage({id: "subject.markus.q-additional-heal-max-hit"}, {value: Constants.Q.count}), skill: "Q", value: Constants.Q.damage, type: {type: "heal", target: "self"}, multiplier: Constants.Q.count * 100, damageDependentHeal: Constants.Q.heal},
        {label: props.intl.formatMessage({id: "subject.markus.passive-additional"}), skill: "T", value: Constants.T.additional_damage}
    ],
    skill: [
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: props.intl.formatMessage({id: "subject.markus.passive-shock"}), skill: "T", value: Constants.T.damage}]
    ]   
})

export default table;