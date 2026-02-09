import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.leni.q-damage" }), origin: "Q", value: Constants.Q.damage },
            { label: props.intl.formatMessage({ id: "subject.leni.q-heal" }), origin: "Q", value: Constants.Q.heal, type: { type: "heal", target: "any" } },
        ],
        [
            { label: "W", origin: "W", value: Constants.W.damage },
            { label: props.intl.formatMessage({ id: "subject.leni.w-movement-speed" }), origin: "W", value: Constants.W.movement_speed.effect, type: { type: "misc", percentExpression: true } }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.leni.e-damage" }), origin: "E", value: Constants.E.damage },
            { label: props.intl.formatMessage({ id: "subject.leni.e-shield" }), origin: "E", value: Constants.E.shield, type: { type: "shield", target: "any" } }
        ],
        [
            { label: "R", origin: "R", value: Constants.R.damage },
            { label: "R壁ドン", origin: "R", value: Constants.R.wall_damage }
        ],
        [{ label: props.intl.formatMessage({ id: "subject.leni.passive-additional" }), origin: "T", value: Constants.T.damage }]
    ]
})

export default table;