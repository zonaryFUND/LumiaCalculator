import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard"
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage, type: "critical"},
            {label: props.intl.formatMessage({id: "subject.camilo.q2-first"}), skill: "Q", value: Constants.Q.Q2_first_damage, type: "critical"},
            {label: props.intl.formatMessage({id: "subject.camilo.q2-second"}), skill: "Q", value: Constants.Q.Q2_second_damage, type: "critical"},
            {label: props.intl.formatMessage({id: "subject.camilo.q2-heal"}), skill: "Q", value: Constants.Q.heal, type: "heal", target: "self"}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage, type: "critical"},
            {label: props.intl.formatMessage({id: "subject.camilo.w-max-hit"}, {value: Constants.W.count}), skill: "W", value: Constants.W.damage, type: "critical", multiplier: [{basic: Constants.W.count * 100}]},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.camilo.e1"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.camilo.e2"}), skill: "E", value: Constants.E.second_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.camilo.r-1hit"}), skill: "R" as any, value: Constants.R.one_hit_damage},
            {label: props.intl.formatMessage({id: "subject.camilo.r-2hit"}), skill: "R" as any, value: Constants.R.two_hit_damage} as SkillValueProps
        ].concat([...Array(Constants.R.heal.maxHit)].map((_, i) => 
            ({label: props.intl.formatMessage({id: "subject.camilo.r-heal"}, {value: i + 1}), skill: "R", value: Constants.R.heal, type: "heal", target: "self", multiplier: [{basic: Constants.R.heal.perHit.map(v => v * (i + 1) + 100)}]} as SkillValueProps)
        )),
        [{label: props.intl.formatMessage({id: "subject.camilo.passive-shield"}), skill: "T", value: Constants.T.shield, type: "shield", target: "self"}]
    ]
})

export default table;