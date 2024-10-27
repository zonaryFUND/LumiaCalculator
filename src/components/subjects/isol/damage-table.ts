import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const maxW = Math.ceil(Constants.W.duration / Constants.W.tick);

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.isol.aa-after-e"}), "skill": "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", "skill": "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.isol.q-additional-damage-1"}), "skill": "Q", value: Constants.Q.additional_damage}
        ],
        [
            {label: "W", "skill": "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.isol.w-max"}, {value: maxW}), "skill": "W", value: Constants.W.damage, multiplier: maxW * 100}
        ],
        [{label: "R", "skill": "R", value: Constants.R.damage}],
    ]
})

export default table;