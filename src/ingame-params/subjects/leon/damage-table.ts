import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.leon.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [{ label: "Q", origin: "Q", value: Constants.Q.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.leon.w-shield" }), origin: "W", value: Constants.W.shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.leon.w-shield-ally" }), origin: "W", value: Constants.W.ally_shield, type: { type: "shield", target: "ally" } }
        ],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.leon.r-wave" }), origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.leon.r-wall" }), origin: "R", value: Constants.R.wall_damage }
        ]
    ]
})

export default table;