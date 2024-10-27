import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.lenore.q-1hit"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.lenore.q-allhit"}), skill: "Q", value: Constants.Q.damage, multiplier: 100 + (100 - Constants.Q.same_target_reduction) * 4},
            {label: props.intl.formatMessage({id: "subject.lenore.q-enhanced-1hit"}), skill: "Q", value: Constants.Q.damage, multiplier: 100 + Constants.Q.additional_damage},
            {label: props.intl.formatMessage({id: "subject.lenore.q-enhanced-allhit"}), skill: "Q", value: Constants.Q.damage, multiplier: (100 + (100 - Constants.Q.same_target_reduction) * 4) * (100 + Constants.Q.additional_damage) / 100},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lenore.w-shield"}), skill: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.lenore.w-damage"}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.lenore.w-enhanced-shield"}), skill: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}, multiplier: 100 + Constants.W.enhance.shield}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lenore.r-dot-1tick"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.lenore.r-dot-fulltick"}), skill: "R", value: Constants.R.damage, multiplier: Constants.R.duration / Constants.R.damage_tick * 100},
            {label: props.intl.formatMessage({id: "subject.lenore.r-finish"}), skill: "R", value: Constants.R.finish_damage}
        ],
        [{label: "T", skill: "T", value: Constants.T.additional_damage}]
    ]   
})

export default table;