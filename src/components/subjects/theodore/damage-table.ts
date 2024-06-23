import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.theodore.w-additional"}), skill: "W", value: Constants.W.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.theodore.q-damage"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.theodore.q-heal"}), skill: "Q", value: Constants.Q.heal, type: "heal"},
            {label: props.intl.formatMessage({id: "subject.theodore.q-screen-damage"}), skill: "Q", value: Constants.Q.screen_damage},
            {label: props.intl.formatMessage({id: "subject.theodore.q-screen-heal"}), skill: "Q", value: Constants.Q.screen_heal, type: "heal", target: "any"}
        ],
        [{label: props.intl.formatMessage({id: "subject.theodore.e-additional"}), skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: props.intl.formatMessage({id: "subject.theodore.passive-shield"}), skill: "T", value: Constants.T.shield, type: "shield", target: "self"}]
    ]   
})

export default table;