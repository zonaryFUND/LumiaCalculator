import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.darko.q-additional"}), skill: "Q", value: Constants.Q.damage},
        {label: props.intl.formatMessage({id: "subject.darko.q-additional-enhanced"}), skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.mark_enhance.map(v => v + 100)}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-base"}), skill: "W", value: Constants.W.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-additional"}), skill: "W", value: Constants.W.additional_shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-additional-3hit"}), skill: "W", value: Constants.W.additional_shield, type: {type: "shield", target: "self"}, multiplier: 300},
            {label: props.intl.formatMessage({id: "subject.darko.w-shield-additional-max"}), skill: "W", value: Constants.W.additional_shield, type: {type: "shield", target: "self"}, multiplier: Constants.W.max_hit * 100}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}]
    ]   
})

export default table;