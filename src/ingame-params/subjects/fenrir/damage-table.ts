import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.fenrir.e"}), origin: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.fenrir.q-enhanced"}), origin: "Q", value: Constants.Q.enhanced_damage},
            {label: props.intl.formatMessage({id: "subject.fenrir.q-enhanced-heal"}), origin: "Q", value: Constants.Q.heal, type: {type: "heal", target: "self"}}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.fenrir.w-first-damage"}), origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.fenrir.w-second-damage"}), origin: "W", value: Constants.W.second_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.fenrir.r-shield"}), origin: "R", value: Constants.R.shield.effect, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.fenrir.r-damage"}), origin: "R", value: Constants.R.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.fenrir.passive-damage"}), origin: "T", value: Constants.T.vf_absorption.damage},
            {label: props.intl.formatMessage({id: "subject.fenrir.passive-heal"}), origin: "T", value: Constants.T.vf_absorption.heal, type: {type: "heal", target: "self"}}
        ]
    ]   
})

export default table;