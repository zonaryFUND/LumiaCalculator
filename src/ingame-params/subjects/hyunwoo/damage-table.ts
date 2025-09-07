import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";
import { hyunwooWDefenseStrategy } from "./w";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard"
    ],
    skill: [
        [{label: "Q", origin: "Q", value: Constants.Q.damage}],
        [{label: props.intl.formatMessage({id: "subject.hyunwoo.w-defense"}), origin: "W", value: hyunwooWDefenseStrategy, type: {type: "misc"}}],
        [
            {label: "E", origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.hyunwoo.e-additional"}), origin: "E", value: Constants.E.wall_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hyunwoo.r-min"}), origin: "R", value: Constants.R.min_damage},
            {label: props.intl.formatMessage({id: "subject.hyunwoo.r-max"}), origin: "R", value: Constants.R.max_damage}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hyunwoo.passive-additional"}), origin: "T", value: Constants.T.damage},
            {label: props.intl.formatMessage({id: "subject.hyunwoo.passive-heal"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}}
        ]
    ]   
})

export default table;