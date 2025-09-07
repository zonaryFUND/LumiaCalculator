import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const maxW = Math.ceil(Constants.W.duration / Constants.W.tick);

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.isol.aa-after-e"}), "origin": "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", "origin": "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.isol.q-additional-damage-1"}), "origin": "Q", value: Constants.Q.additional_damage}
        ],
        [
            {label: "W", "origin": "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.isol.w-max"}, {value: maxW}), "origin": "W", value: Constants.W.damage, multiplier: maxW * 100}
        ],
        [{label: "R", "origin": "R", value: Constants.R.damage}],
    ]
})

export default table;