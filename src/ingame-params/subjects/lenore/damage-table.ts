import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.lenore.q-1hit"}), origin: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.lenore.q-allhit"}), origin: "Q", value: Constants.Q.damage, multiplier: 100 + (100 - Constants.Q.same_target_reduction) * 4},
            {label: props.intl.formatMessage({id: "subject.lenore.q-enhanced-1hit"}), origin: "Q", value: Constants.Q.damage, multiplier: 100 + Constants.Q.additional_damage},
            {label: props.intl.formatMessage({id: "subject.lenore.q-enhanced-allhit"}), origin: "Q", value: Constants.Q.damage, multiplier: (100 + (100 - Constants.Q.same_target_reduction) * 4) * (100 + Constants.Q.additional_damage) / 100},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.lenore.w-shield"}), origin: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.lenore.w-damage"}), origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.lenore.w-enhanced-shield"}), origin: "W", value: Constants.W.shield.effect, type: {type: "shield", target: "self"}, multiplier: 100 + Constants.W.enhance.shield}
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lenore.r-dot-1tick"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.lenore.r-dot-fulltick"}), origin: "R", value: Constants.R.damage, multiplier: Constants.R.duration / Constants.R.damage_tick * 100},
            {label: props.intl.formatMessage({id: "subject.lenore.r-finish"}), origin: "R", value: Constants.R.finish_damage}
        ],
        [{label: "T", origin: "T", value: Constants.T.additional_damage}]
    ]   
})

export default table;