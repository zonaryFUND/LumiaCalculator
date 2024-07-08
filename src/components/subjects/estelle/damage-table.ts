import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const maxW2 = Constants.W2.duration / Constants.W2.tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.estelle.q-additional"}), skill: "Q", value: Constants.Q.damage}
    ],
    skill: [
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.estelle.ew"}), skill: "W", value: Constants.W2.damage},
            {label: props.intl.formatMessage({id: "subject.estelle.ew-max-hit"}, {value: maxW2}), skill: "W", value: Constants.W2.damage, multiplier: [{basic: maxW2 * 100}]},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.estelle.e-mitigation"}), skill: "E", value: Constants.E.damage_reduction, type: "ratio"},
            {label: "E2", skill: "E", value: Constants.E2.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.estelle.r-self-shield"}), skill: "R", value: Constants.R.self.shield, type: "shield", target: "self"},
            {label: props.intl.formatMessage({id: "subject.estelle.r-self-damage"}), skill: "R", value: Constants.R.self.damage},
            {label: props.intl.formatMessage({id: "subject.estelle.r-ally-shield"}), skill: "R", value: Constants.R.ally.shield, type: "shield"},
            {label: props.intl.formatMessage({id: "subject.estelle.r-ally-damage"}), skill: "R", value: Constants.R.ally.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.estelle.t-heal"}), skill: "T", value: Constants.T.heal, type: "heal", target: "self"},
            {label: props.intl.formatMessage({id: "subject.estelle.t-ally-heal"}), skill: "T", value: Constants.T.additional_heal, type: "heal"}
        ]
    ]
})

export default table;