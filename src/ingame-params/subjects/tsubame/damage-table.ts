import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.tsubame.passive-damage"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.tsubame.r-min"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.tsubame.r-max"}), skill: "R", value: Constants.R.damage, multiplier: 100 + Constants.R.max_multiplier}
        ]
    ]
})

export default table;