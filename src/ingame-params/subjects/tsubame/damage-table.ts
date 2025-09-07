import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.tsubame.passive-damage"}), origin: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.sissela.q-pass"}), origin: "Q", value: Constants.Q.through_damage},
            {label: props.intl.formatMessage({id: "subject.sissela.q-blast"}), origin: "Q", value: Constants.Q.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.tsubame.r-min"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.tsubame.r-max"}), origin: "R", value: Constants.R.damage, multiplier: 100 + Constants.R.max_multiplier}
        ]
    ]
})

export default table;