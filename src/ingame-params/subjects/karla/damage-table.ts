import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        { label: "Q", origin: "Q", value: Constants.Q.damage, type: { type: "basic" } },
        { label: props.intl.formatMessage({ id: "subject.karla.q-second-target" }), origin: "Q", value: Constants.Q.second_damage, type: { type: "basic" } },
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.karla.w" }, { value: 1 }), origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.karla.w" }, { value: 2 }), origin: "W", value: Constants.W.damage, multiplier: 200 - 1 * Constants.W.damage_reduction },
            { label: props.intl.formatMessage({ id: "subject.karla.w" }, { value: 3 }), origin: "W", value: Constants.W.damage, multiplier: 300 - 3 * Constants.W.damage_reduction },
        ],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.karla.r-set" }), origin: "R", value: Constants.R.first_damage },
            { label: props.intl.formatMessage({ id: "subject.karla.r-pull" }), origin: "R", value: Constants.R.second_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.karla.passive-non-charge" }), origin: "T", value: Constants.T.damage },
            { label: props.intl.formatMessage({ id: "subject.karla.passive-charge" }), origin: "T", value: Constants.T.full_charge_damage }
        ]
    ]
})

export default table;