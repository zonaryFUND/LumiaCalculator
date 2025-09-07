import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.theodore.w-additional"}), origin: "W", value: Constants.W.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.theodore.q-damage"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.theodore.q-heal"}), origin: "Q", value: Constants.Q.heal, type: {type: "heal", target: "ally"}},
            {label: props.intl.formatMessage({id: "subject.theodore.q-screen-damage"}), origin: "Q", value: Constants.Q.screen_damage},
            {label: props.intl.formatMessage({id: "subject.theodore.q-screen-heal"}), origin: "Q", value: Constants.Q.screen_heal, type: {type: "heal", target: "any"}}
        ],
        [{label: props.intl.formatMessage({id: "subject.theodore.e-additional"}), origin: "E", value: Constants.E.damage}],
        [{label: "R", origin: "R", value: Constants.R.damage}],
        [{label: props.intl.formatMessage({id: "subject.theodore.passive-shield"}), origin: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}]
    ]   
})

export default table;