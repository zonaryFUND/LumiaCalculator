import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const wMaxTick = Constants.W.charge_duration_max / Constants.W.heal_tick;
const { stack, ...wHealMin } = Constants.W.finish_heal;
const wHealMax = { ...wHealMin, base: wHealMin.base.map((v, i) => v + stack[i] * Constants.W.max_stack) };

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [
            { label: "Q1", origin: "Q", value: Constants.Q.Q1_damage },
            { label: "Q2", origin: "Q", value: Constants.Q.Q2_damage },
        ],
        [
            { label: props.intl.formatMessage({ id: "subject.garnet.w-channeling-heal" }), origin: "W", value: Constants.W.heal, type: { type: "heal", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.garnet.w-damage-min" }), origin: "W", value: Constants.W.min_damage },
            { label: props.intl.formatMessage({ id: "subject.garnet.w-damage-max" }), origin: "W", value: Constants.W.max_damage },
            { label: props.intl.formatMessage({ id: "subject.garnet.w-finish-heal-min" }), origin: "W", value: wHealMin, type: { type: "heal", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.garnet.w-finish-heal-max" }, { value: Constants.W.max_stack }), origin: "W", value: wHealMax, type: { type: "heal", target: "self" } }
        ],
        [{ label: "E", origin: "E", value: Constants.E.damage }],
        [{ label: "R", origin: "R", value: Constants.R.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.garnet.passive-damage-reduction" }), origin: "T", value: Constants.T.reduction, type: { type: "misc" } }]
    ]
})

export default table;