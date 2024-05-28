import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const rTicks = Constants.R.duration / Constants.R.heal_tick;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.hart.passive-additional"}), skill: "T", value: Constants.T.damage, type: "basic"},
        {label: props.intl.formatMessage({id: "subject.hart.passive-additional-max-hit"}, {value: Constants.T.evoluted_sound_wave}), skill: "T", value: Constants.T.damage, type: "basic", multiplier: [{basic: Constants.T.evoluted_sound_wave * 100}]}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.hart.q-min"}), skill: "Q", value: Constants.Q.min_damage},
            {label: props.intl.formatMessage({id: "subject.hart.q-max"}), skill: "Q", value: Constants.Q.max_damage},
        ],
        [{label: props.intl.formatMessage({id: "subject.hart.w-additional"}), skill: "W", value: Constants.W.buff_damage}],
        [
            {label: "E", skill: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.hart.e-max-hit"}, {value: 2}), skill: "E", value: Constants.E.damage, multiplier: [{basic: 200}]},
            {label: props.intl.formatMessage({id: "subject.hart.e-evolved-max-hit"}, {value: 3}), skill: "E", value: Constants.E.damage, multiplier: [{basic: 300}]}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hart.r-heal-tick"}, {value: 0.5}), skill: "R", value: Constants.R.heal, type: "heal"},
            {label: props.intl.formatMessage({id: "subject.hart.r-heal-max-tick"}, {value: rTicks}), skill: "R", value: Constants.R.heal, type: "heal", multiplier: [{basic: rTicks * 100}]}
        ]
    ]   
})

export default table;