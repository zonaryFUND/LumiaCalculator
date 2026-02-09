import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.sua.passive-additional" }), origin: "T", value: Constants.T.damage },
        { label: props.intl.formatMessage({ id: "subject.sua.passive-heal" }), origin: "T", value: Constants.T.damage, damageDependentHeal: Constants.T.heal },
        { label: props.intl.formatMessage({ id: "subject.sua.passive-additional-aoe" }), origin: "T", value: Constants.T.aoe_damage },
        { label: props.intl.formatMessage({ id: "subject.sua.passive-heal-aoe" }), origin: "T", value: Constants.T.aoe_damage, damageDependentHeal: Constants.T.heal }
    ],
    skill: [
        [
            { label: "Q", origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.sua.q-bookmark" }), origin: "Q", value: Constants.Q.bookmark_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.sua.w-shield" }), origin: "W", value: Constants.W.shield, type: { type: "shield", target: "any" } },
            { label: props.intl.formatMessage({ id: "subject.sua.w-damage" }), origin: "W", value: Constants.W.damage }
        ],
        [
            { label: "E", origin: "E", value: Constants.E.damage },
            { label: props.intl.formatMessage({ id: "subject.sua.e-bookmark" }), origin: "E", value: Constants.E.bookmark_damage },
            { label: props.intl.formatMessage({ id: "subject.sua.e-heal-min" }), origin: "E", value: Constants.E.heal, type: { type: "heal", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.sua.e-heal-max" }), origin: "E", value: Constants.E.heal, type: { type: "heal", target: "self" }, multiplier: Constants.E.heal_max_multiplier * 100 },
        ],
        [
            { label: "RQ", origin: "R", value: Constants.RQ.damage },
            { label: props.intl.formatMessage({ id: "subject.sua.rq-bookmark" }), origin: "R", value: Constants.RQ.bookmark_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.sua.rw-shield" }), origin: "R", value: Constants.RW.shield, type: { type: "shield", target: "any" } },
            { label: props.intl.formatMessage({ id: "subject.sua.rw-damage" }), origin: "R", value: Constants.RW.damage }
        ],
        [
            { label: "RE", origin: "R", value: Constants.RE.damage },
            { label: props.intl.formatMessage({ id: "subject.sua.re-bookmark" }), origin: "R", value: Constants.RE.bookmark_damage },
            { label: props.intl.formatMessage({ id: "subject.sua.re-heal-min" }), origin: "R", value: Constants.RE.heal, type: { type: "heal", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.sua.re-heal-max" }), origin: "R", value: Constants.RE.heal, type: { type: "heal", target: "self" }, multiplier: Constants.RE.heal_max_multiplier * 100 },
        ]
    ]
})

export default table;