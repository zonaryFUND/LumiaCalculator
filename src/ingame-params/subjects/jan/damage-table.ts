import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.jan.e-additional" }), origin: "E", value: Constants.E.damage }
    ],
    skill: [
        [
            { label: "Q1", origin: "Q", value: Constants.Q.damage },
            { label: "Q2", origin: "Q", value: Constants.Q.Q2_damage }
        ],
        [
            { label: "W", origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.jan.w-enhanced" }), origin: "W", value: Constants.W.enhanced_damage },
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.jan.e-heal-min" }), "origin": "T", value: Constants.E.damage, type: { type: "heal", target: "self" }, damageDependentHeal: Constants.E.heal.min },
            { label: props.intl.formatMessage({ id: "subject.jan.e-heal-max" }), "origin": "T", value: Constants.E.damage, type: { type: "heal", target: "self" }, damageDependentHeal: Constants.E.heal.max }
        ],
        [{ label: props.intl.formatMessage({ id: "subject.jan.r-rope" }), origin: "R", value: Constants.R.damage }]
    ]
})

export default table;