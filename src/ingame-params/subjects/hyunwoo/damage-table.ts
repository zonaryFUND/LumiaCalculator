import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";
import { hyunwooWDefenseStrategy } from "./w";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard"
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: props.intl.formatMessage({id: "subject.hyunwoo.w-defense"}), skill: "W", value: hyunwooWDefenseStrategy, type: {type: "misc"}}],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.hyunwoo.e-additional"}), skill: "E", value: Constants.E.wall_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hyunwoo.r-min"}), skill: "R", value: Constants.R.min_damage},
            {label: props.intl.formatMessage({id: "subject.hyunwoo.r-max"}), skill: "R", value: Constants.R.max_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hyunwoo.passive-additional"}), skill: "T", value: Constants.T.damage},
            {label: props.intl.formatMessage({id: "subject.hyunwoo.passive-heal"}), skill: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}}
        ]
    ]   
})

export default table;