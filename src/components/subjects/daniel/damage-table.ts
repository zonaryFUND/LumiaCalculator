import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.daniel.e-additional"}), skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q", skill: "Q", value: Constants.Q.damage},
            {label: props.intl.formatMessage({id: "subject.daniel.q-center"}), skill: "Q", value: Constants.Q.center_damage},
        ],
        [{label: props.intl.formatMessage({id: "subject.daniel.w-blast-base"}), skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.daniel.r-1hit"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.daniel.r-max-hit"}, {value: Constants.R.damage_count}), skill: "R", value: Constants.R.damage, multiplier: [{basic: Constants.R.damage_count * 100}]},
            {label: props.intl.formatMessage({id: "subject.daniel.r-finish-min"}), skill: "R", value: Constants.R.finish_damage},
            {label: props.intl.formatMessage({id: "subject.daniel.r-finish-max"}), skill: "R", value: Constants.R.finish_damage, multiplier: [{basic: Constants.R.finish_multiplier_max}]}
        ]
    ]   
})

export default table;