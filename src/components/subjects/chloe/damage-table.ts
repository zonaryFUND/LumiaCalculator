import { DamageTable, DamageTableGenerator, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";
import { NinaRatioStrategy } from "./nina-ratio-strategy";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.chloe.nina-aa"}), skill: "T", value: {attack: 100}, type: {type: "basic", fromSummoned: true}}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: NinaRatioStrategy("Q", Constants.Q.damage)}],
        [
            {label: props.intl.formatMessage({id: "subject.chloe.w-string-damage-per-sec"}), skill: "W", value: Constants.W.damage, type: {type: "true"}},
            {label: props.intl.formatMessage({id: "subject.chloe.w-string-damage-max"}, {value: Constants.W.duration}), skill: "W", value: Constants.W.damage, type: {type: "true"}, multiplier: Constants.W.duration * 100},
            {label: props.intl.formatMessage({id: "subject.chloe.w-blade"}), skill: "W", value: Constants.W.drop_damage},
            {label: props.intl.formatMessage({id: "subject.chloe.w-nina"}), skill: "W", value: NinaRatioStrategy("W", Constants.W.nina_damage)}
        ],
        [
            {label: "E1", skill: "E", value: Constants.E.first_damage},
            {label: "E2", skill: "E", value: NinaRatioStrategy("E", Constants.E.second_damage)}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.chloe.r-min"}), skill: "R", value: Constants.R.damage, type: {type: "true"}},
            {label: props.intl.formatMessage({id: "subject.chloe.r-max"}), skill: "R", value: Constants.R.damage, multiplier: Constants.R.damage_max_multipler * 100, type: {type: "true"}},
        ],
       [{label: props.intl.formatMessage({id: "subject.chloe.passive-nina"}), skill: "T", value: NinaRatioStrategy("T", Constants.T.damage)}]
    ]
})

export default table;