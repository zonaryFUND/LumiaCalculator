import { DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{ label: "Q", origin: "Q", value: Constants.Q.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.xiukai.w-heal" }), origin: "W", value: Constants.W.heal, type: { type: "heal", target: "any" } }],
        [
            { label: "E1", origin: "E", value: Constants.E.first_damage },
            { label: "E2", origin: "E", value: Constants.E.second_damage }
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.xiukai.r-1hit" }), origin: "R", value: Constants.R.damage },
            { label: props.intl.formatMessage({ id: "subject.xiukai.r-max-hit" }, { value: Constants.R.count }), origin: "R", value: Constants.R.damage, multiplier: Constants.R.count * 100 }
        ]
    ]
})

export default table;