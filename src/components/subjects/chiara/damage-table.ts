import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const qMax = {
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.additional_damage.base[i] * 4),
    amp: Constants.Q.damage.amp + Constants.Q.additional_damage.amp * 4
}

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.chiara.q-1hit"}), skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.chiara.q-2hit"}), skill: "Q", value: Constants.Q.additional_damage},
            {label: props.intl.formatMessage({id: "subject.chiara.q-max"}), skill: "Q", value: qMax},
            {label: props.intl.formatMessage({id: "subject.chiara.q-1heal"}), skill: "Q", value: Constants.Q.heal, type: "heal", target: "self"},
            {label: props.intl.formatMessage({id: "subject.chiara.q-max-heal"}, {value: 5}), skill: "Q", value: Constants.Q.heal, type: "heal", target: "self", multiplier: [{basic: 500}]}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.chiara.w-min"}), skill: "W", value: Constants.W.shield, type: "shield", target: "self"},
            {label: props.intl.formatMessage({id: "subject.chiara.w-max"}, {value: Constants.W.max_shield_hp}), skill: "W", value: Constants.W.shield, type: "shield", target: "self", multiplier: [{basic: 100 + Constants.W.max_shield}]},
            {label: props.intl.formatMessage({id: "subject.chiara.w-damage"}), skill: "W", value: Constants.W.damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.chiara.e-hit"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.chiara.e-launch"}), skill: "E", value: Constants.E.second_damage}
        ],
        ([
            {label: props.intl.formatMessage({id: "subject.chiara.r-dot"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.chiara.r-hot"}), skill: "R", value: Constants.R.heal, type: "heal", target: "self"}
        ] as SkillValueProps[])
        .concat([...Array(Constants.T.max_stack + 1)].map((_, i) => (
            {label: props.intl.formatMessage({id: "subject.chiara.r-execute"}, {value: i}), skill: "R", value: Constants.R.finish_damage, type: "true", multiplier: i == 0 ? undefined : [{basic: 100 + i * Constants.R.additional_damage_per_stack}]} as SkillValueProps)
        ))
    ]
})

export default table;