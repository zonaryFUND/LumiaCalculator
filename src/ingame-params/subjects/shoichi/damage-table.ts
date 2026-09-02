import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.shoichi.passive-additional" }), origin: "T", value: Constants.T.basic_attack_damage }
    ],
    skill: [
        [{ label: "Q", origin: "Q", value: Constants.Q.damage }],
        [{ label: "W", origin: "W", value: Constants.W.damage }],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.shoichi.r-bag" }), origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.shoichi.r-dagger" }), origin: "R", value: Constants.R.knife_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.shoichi.passive-dagger-throw" }), origin: "T", value: Constants.T.knife_damage },
            { label: props.intl.formatMessage({ id: "subject.shoichi.passive-dagger-throw-marked" }), origin: "T", value: Constants.T.knife_damage, multiplier: Constants.E.damage_increase + 100 }
        ]
    ]
})

export default table;