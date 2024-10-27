import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.hart.passive-additional"}), skill: "T", value: Constants.T.damage, type: {type: "basic"}},
        {label: props.intl.formatMessage({id: "subject.hart.passive-additional-max-hit"}, {value: Constants.T.evoluted_sound_wave}), skill: "T", value: Constants.T.damage, type: {type: "basic"}, multiplier: Constants.T.evoluted_sound_wave * 100}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.hart.q-min"}), skill: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.hart.q-max"}), skill: "Q", value: Constants.Q.max_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hart.e-1hit"}), skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.hart.e-max-hit"}, {value: 2}), skill: "E", value: Constants.E.damage, multiplier: 200}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hart.r-heal"}), skill: "R", value: Constants.R.heal, type: {type: "heal", target: "any"}}
        ]
    ]   
})

export default table;