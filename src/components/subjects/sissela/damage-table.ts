import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.sissela.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.sissela.q-pass"}), skill: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.sissela.q-blast"}), skill: "Q", value: Constants.Q.second_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.sissela.e-shield"}), skill: "E", value: Constants.E.shield, type: "shield"},
            {label: props.intl.formatMessage({id: "subject.sissela.e-damage"}), skill: "E", value: Constants.E.damage},
        ],
        [{label: "R", skill: "R", value: {...Constants.R.damage, lostHP: Constants.R.lost_hp_conversion}}]
    ]   
})

export default table;