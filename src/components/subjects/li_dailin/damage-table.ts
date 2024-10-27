import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.lidailin.w-aa-max"}), skill: "W", value: {attack: 100, basicAttackAmp: 100}, type: {type: "basic"}, multiplier: 100 + Constants.W.basic_attack_amp * 100},
        {label: props.intl.formatMessage({id: "subject.lidailin.passive-chase"}), skill: "T", value: Constants.T.damage, type: {type: "basic"}}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.lidailin.q-max"}, {value: Constants.Q.count}), skill: "Q", value: Constants.Q.damage, multiplier: Constants.Q.count * 100},
            {label: props.intl.formatMessage({id: "subject.lidailin.q-enhanced"}), skill: "Q", value: Constants.Q.enhanced_damage},
            {label: props.intl.formatMessage({id: "subject.lidailin.q-enhanced-max"}, {value: Constants.Q.count}), skill: "Q", value: Constants.Q.enhanced_damage, multiplier: Constants.Q.count * 100}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.lidailin.r-1hit-min"}), skill: "R", value: Constants.R.min_damage},
            {label: props.intl.formatMessage({id: "subject.lidailin.r-min-max-hit"}, {value: Constants.R.count}), skill: "R", value: Constants.R.min_damage, multiplier: Constants.R.count * 100},
            {label: props.intl.formatMessage({id: "subject.lidailin.r-1hit-max"}), skill: "R", value: Constants.R.max_damage},
            {label: props.intl.formatMessage({id: "subject.lidailin.r-max-max-hit"}, {value: Constants.R.count}), skill: "R", value: Constants.R.max_damage, multiplier: Constants.R.count * 100},
        ]
    ]   
})

export default table;