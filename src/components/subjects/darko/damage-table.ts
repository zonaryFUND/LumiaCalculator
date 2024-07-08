import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.darko.q-additional"}), skill: "Q", value: Constants.Q.damage},
        {label: props.intl.formatMessage({id: "subject.darko.q-additional-enhanced"}), skill: "Q", value: Constants.Q.damage, multiplier: [{basic: Constants.Q.mark_enhance.map(v => v + 100)}]}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-base"}), skill: "W", value: Constants.W.shield, type: "shield", target: "self"},
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-additional"}), skill: "W", value: Constants.W.additional_shield, type: "shield", target: "self"},
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-additional-3hit"}), skill: "W", value: Constants.W.additional_shield, type: "shield", target: "self", multiplier: [{basic: 300}]},
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-additional-max"}), skill: "W", value: Constants.W.additional_shield, type: "shield", target: "self", multiplier: [{basic: Constants.W.max_hit * 100}]}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}]
    ]   
})

export default table;