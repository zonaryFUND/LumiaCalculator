import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";

const tCount = Constants.T.dot.duration / Constants.T.dot.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
    ],
    skill: [
        [
            { label: "Q", origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.mirka.q-enhanced" }), origin: "Q", value: { ...Constants.Q.damage, ...Constants.Q.enhance.additional_damage } },
            { label: props.intl.formatMessage({ id: "subject.mirka.q-enhanced-aftereffect-1hit" }), origin: "Q", value: Constants.Q.enhance.after_effect.damage },
            { label: props.intl.formatMessage({ id: "subject.mirka.q-enhanced-aftereffect-max-hit" }, { value: Constants.Q.enhance.after_effect.count }), origin: "Q", value: Constants.Q.enhance.after_effect.damage, multiplier: Constants.Q.enhance.after_effect.count * 100 }

        ],
        [
            { label: "W", origin: "W", value: Constants.W.shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.mirka.w-impulse-gain-increase" }), origin: "W", value: Constants.W.impluse_gain_increase, type: { type: "misc", percentExpression: true } },

        ],
        [
            { label: "E1", origin: "E", value: Constants.E.first_damage },
            { label: "E2", origin: "E", value: Constants.E.second_damage },
            { label: props.intl.formatMessage({ id: "subject.mirka.e2-enhanced" }), origin: "E", value: { ...Constants.E.second_damage, ...Constants.E.enhance.additional_damage } }
        ],
        [{ label: "R", origin: "R", value: Constants.R.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.mirka.passive-damage-1tick" }), origin: "T", value: Constants.T.dot.value },
            { label: props.intl.formatMessage({ id: "subject.mirka.passive-damage-max" }, { value: Constants.T.dot.duration }), origin: "T", value: Constants.T.dot.value, multiplier: tCount * 100 }
        ]
    ]
})

export default table;