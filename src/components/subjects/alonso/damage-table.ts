import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const wMax = Constants.W.waves;
const rMax = Constants.R.duration / Constants.R.tick - 1; // last tick is final blast

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.alonso.q-aa"}), skill: "Q", value: Constants.Q.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.alonso.w-wave"}), skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.alonso.w-wave-max-hit"}, {value: wMax}), skill: "W", value: Constants.W.damage, multiplier: [{basic: wMax * 100}]},
            {label: props.intl.formatMessage({id: "subject.alonso.w-finish"}), skill: "W", value: Constants.W.final_damage},
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.alonso.r-pull"}), skill: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.alonso.r-damage-per-tick"}, {value: Constants.R.tick}), skill: "R", value: Constants.R.damage_on_time},
            {label: props.intl.formatMessage({id: "subject.alonso.r-damage-max-hit"}, {value: rMax}), skill: "R", value: Constants.R.damage_on_time, multiplier: [{basic: rMax * 100}]},
            {label: props.intl.formatMessage({id: "subject.alonso.r-heal-per-tick"}, {value: Constants.R.tick}), skill: "R", value: Constants.R.heal},
            {label: props.intl.formatMessage({id: "subject.alonso.r-heal-max"}, {value: rMax}), skill: "R", value: Constants.R.heal, multiplier: [{basic: rMax * 100}]},
            {label: props.intl.formatMessage({id: "subject.alonso.r-finish-damage-min"}), skill: "R", value: Constants.R.final_damage.min},
            {label: props.intl.formatMessage({id: "subject.alonso.r-finish-damage-max"}), skill: "R", value: Constants.R.final_damage.max}
        ],
        [{label: props.intl.formatMessage({id: "subject.alonso.passive-heal"}), skill: "T", value: Constants.T.heal, type: "heal", target: "self"}]
    ]
})

export default table;