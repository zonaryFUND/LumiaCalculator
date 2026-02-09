import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.niah.q-drop" }), origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.niah.q-pull" }), origin: "Q", value: Constants.Q.pull_damage },
            { label: props.intl.formatMessage({ id: "subject.niah.q-pull-prural" }), origin: "Q", value: Constants.Q.pull_damage, multiplier: 100 - Constants.Q.prural_hit },
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.niah.w-first" }), origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.niah.w-second" }), origin: "W", value: Constants.W.pull_damage, type: { type: "true" } }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.niah.e-heal" }), origin: "E", value: Constants.E.heal, type: { type: "heal", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.niah.e-ms" }), origin: "E", value: Constants.E.movement_speed.effect, type: { type: "misc", percentExpression: true } },
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.niah.r-damage" }), origin: "R", value: Constants.R.inner_damage },
            { label: props.intl.formatMessage({ id: "subject.niah.r-shield-nostack" }), origin: "R", value: Constants.R.shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.niah.r-shield-stack" }), origin: "R", value: { base: Constants.R.shield.stack }, type: { type: "shield", target: "self" } }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.niah.passive-base" }), origin: "T", value: Constants.T.stack_base },
            { label: props.intl.formatMessage({ id: "subject.niah.passive-stack" }), origin: "T", value: Constants.T.stack }
        ]
    ]
})

export default table;