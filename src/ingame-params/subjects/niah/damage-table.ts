import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.niah.q-drop"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.niah.q-pull"}), skill: "Q", value: Constants.Q.pull_damage},
            {label: props.intl.formatMessage({id: "subject.niah.q-pull-prural"}), skill: "Q", value: Constants.Q.pull_damage, multiplier: 100 - Constants.Q.prural_hit},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.niah.w-first"}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.niah.w-second"}), skill: "W", value: Constants.W.pull_damage, type: {type: "true"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.niah.e-heal"}), skill: "E", value: Constants.E.heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.niah.e-ms"}), skill: "E", value: Constants.E.movement_speed.effect, type: {type: "misc", percentExpression: true}},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.niah.r-damage"}), skill: "R", value: Constants.R.inner_damage},
            {label: props.intl.formatMessage({id: "subject.niah.r-shield-nostack"}), skill: "R", value: Constants.R.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.niah.r-shield-stack"}), skill: "R", value: {base: Constants.R.shield.stack}, type: {type: "shield", target: "self"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.niah.passive-base"}), skill: "T", value: Constants.T.stack_base},
            {label: props.intl.formatMessage({id: "subject.niah.passive-stack"}), skill: "T", value: Constants.T.stack}
        ]
    ]   
})

export default table;