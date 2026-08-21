import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.lucia.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.lucia.q-normal" }), origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.lucia.q-enhanced" }), origin: "Q", value: Constants.Q.enhanced_damage },
        ],
        [
            { label: "W", origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.lucia.w-multiple-hit" }), origin: "W", value: Constants.W.damage, multiplier: Constants.W.multiple_hit_damage },
        ],
        [
            { label: "R", origin: "R", value: Constants.R.damage },
        ],
    ]
})

export default table;