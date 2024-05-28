import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.nadine.r-additional"}, {value: Constants.R.count}), skill: "R", value: Constants.R.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.nadine.q-min"}), skill: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.nadine.q-max"}), skill: "Q", value: Constants.Q.max_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}]
    ]   
})

export default table;