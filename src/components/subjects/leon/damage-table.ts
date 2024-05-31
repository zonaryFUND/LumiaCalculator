import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.leon.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: props.intl.formatMessage({id: "subject.leon.w-shield"}), skill: "W", value: Constants.W.shield, type: "shield"}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.leon.r-wave"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.leon.r-wall"}), skill: "R", value: Constants.R.wall_damage}
        ]
    ]   
})

export default table;