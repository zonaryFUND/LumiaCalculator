import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.jenny.e-additional"}), skill: "T", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.jenny.q-1hit"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.jenny.q-max-hit"}, {value: Constants.Q.count}), skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.count * 100}
        ],
        [
            {label: "W1", skill: "W", value: Constants.W.first_damage},
            {label: "W2", skill: "W", value: Constants.W.second_damage}
        ],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: props.intl.formatMessage({id: "subject.jenny.passive-heal"}), skill: "T", value: Constants.T.hp, type: {type: "heal", target: "self"}}]
    ]   
})

export default table;