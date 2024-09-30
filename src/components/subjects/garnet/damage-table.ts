import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const wMaxTick = Constants.W.charge_duration_max / Constants.W.heal_tick;
const {stack, ...wHealMin} = Constants.W.finish_heal;
const wHealMax = {...wHealMin, base: wHealMin.base.map((v, i) => v + stack[i] * Constants.W.max_stack)};

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.Q1_damage},
            {label: "Q2", skill: "Q", value: Constants.Q.Q2_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.garnet.w-channeling-heal"}), skill: "W", value: Constants.W.heal, type: "heal"},
            {label: props.intl.formatMessage({id: "subject.garnet.w-damage-min"}), skill: "W", value: Constants.W.min_damage},
            {label: props.intl.formatMessage({id: "subject.garnet.w-damage-max"}), skill: "W", value: Constants.W.max_damage},
            {label: props.intl.formatMessage({id: "subject.garnet.w-finish-heal-min"}), skill: "W", value: wHealMin, type: "heal"},
            {label: props.intl.formatMessage({id: "subject.garnet.w-finish-heal-max"}, {value: Constants.W.max_stack}), skill: "W", value: wHealMax, type: "heal"}
        ],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [{label: "R", skill: "R", value: Constants.R.damage}],
        [{label: props.intl.formatMessage({id: "subject.garnet.passive-damage-reduction"}), skill: "T", value: Constants.T.reduction, type: "true"}]
    ]   
})

export default table;