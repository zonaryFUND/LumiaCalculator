import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.nadine.r-additional"}, {value: Constants.R.count}), origin: "R", value: Constants.R.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.nadine.q-min"}), origin: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.nadine.q-max"}), origin: "Q", value: Constants.Q.max_damage}
        ],
        [{label: "W", origin: "W", value: Constants.W.damage}],
        [{label: props.intl.formatMessage({id: "subject.nadine.e"}), origin: "E", value: Constants.E.attack_speed, type: {type: "misc", percentExpression: true}}]
    ]   
})

export default table;