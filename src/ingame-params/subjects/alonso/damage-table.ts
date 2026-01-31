import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const wMax = Constants.W.waves;
const rMax = Constants.R.duration / Constants.R.tick - 1; // last tick is final blast

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.alonso.q-aa"}), origin: "Q", value: Constants.Q.basic_attack_damage}
    ],
    skill: [
        [{label: "Q", origin: "Q", value: Constants.Q.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.alonso.w-wave"}), origin: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.alonso.w-wave-max-hit"}, {value: wMax}), origin: "W", value: Constants.W.damage, multiplier: wMax * 100},
            {label: props.intl.formatMessage({id: "subject.alonso.w-finish"}), origin: "W", value: Constants.W.final_damage},
        ],
        [{label: "E", origin: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.alonso.r-pull"}), origin: "R", value: Constants.R.damage},
            {label: props.intl.formatMessage({id: "subject.alonso.r-damage-per-tick"}, {value: Constants.R.tick}), origin: "R", value: Constants.R.damage_on_time},
            {label: props.intl.formatMessage({id: "subject.alonso.r-damage-max-hit"}, {value: rMax}), origin: "R", value: Constants.R.damage_on_time, multiplier: rMax * 100},
            {label: props.intl.formatMessage({id: "subject.alonso.r-heal-per-tick"}, {value: Constants.R.tick}), origin: "R", value: Constants.R.heal, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.alonso.r-heal-max"}, {value: rMax}), origin: "R", value: Constants.R.heal, multiplier: rMax * 100, type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.alonso.r-finish-damage-min"}), origin: "R", value: Constants.R.final_damage.min},
            {label: props.intl.formatMessage({id: "subject.alonso.r-finish-damage-max"}), origin: "R", value: Constants.R.final_damage.max}
        ],
        [{label: props.intl.formatMessage({id: "subject.alonso.passive-heal"}), origin: "T", value: Constants.T.heal, type: {type: "heal", target: "self"}}]
    ]
})

export default table;