import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const rMax = Constants.R2.count;

const table: DamageTableGenerator = props => ({
    basicAttack: [
        { label: props.intl.formatMessage({ id: "subject.martina.interview.aa-1tick" }), origin: "T", value: Constants.T.damage, type: { type: "basic" } },
        { label: props.intl.formatMessage({ id: "subject.martina.interview.aa-max-hit" }, { value: 4 }), origin: "T", value: Constants.T.damage, type: { type: "basic", hitCount: 4 }, multiplier: 400 },
        { label: props.intl.formatMessage({ id: "subject.martina.broadcast.aa-1tick" }), origin: "T", value: Constants.T.broadcasting_damage, type: { type: "basic" } },
        { label: props.intl.formatMessage({ id: "subject.martina.broadcast.aa-max-hit" }, { value: 4 }), origin: "T", value: Constants.T.broadcasting_damage, type: { type: "basic", hitCount: 4 }, multiplier: 400 },
    ],
    skill: [
        [{ label: props.intl.formatMessage({ id: "subject.martina.interview.q" }), origin: "Q", value: Constants.Q.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.martina.interview.w" }), origin: "W", value: Constants.W.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.martina.interview.passive-additional" }), origin: "T", value: Constants.T.mark_damage }],
        [{ label: props.intl.formatMessage({ id: "subject.martina.broadcast.q" }), origin: "Q", value: Constants.Q2.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.martina.broadcast.w" }), origin: "W", value: Constants.W2.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.martina.broadcast.e2" }), origin: "E", value: Constants.E2.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.martina.broadcast.r-outer-1tick" }), origin: "R", value: Constants.R2.first_outer_damage },
            { label: props.intl.formatMessage({ id: "subject.martina.broadcast.r-outer-max-hit" }, { value: rMax }), origin: "R", value: Constants.R2.first_outer_damage, multiplier: rMax * 100 },
            { label: props.intl.formatMessage({ id: "subject.martina.broadcast.r-inner-1tick" }), origin: "R", value: Constants.R2.first_center_damage },
            { label: props.intl.formatMessage({ id: "subject.martina.broadcast.r-inner-max-hit" }, { value: rMax }), origin: "R", value: Constants.R2.first_center_damage, multiplier: rMax * 100 },
            { label: props.intl.formatMessage({ id: "subject.martina.broadcast.r-outer-finish" }), origin: "R", value: Constants.R2.second_outer_damage },
            { label: props.intl.formatMessage({ id: "subject.martina.broadcast.r-inner-finish" }), origin: "R", value: Constants.R2.second_center_damage }
        ],
        [{ label: props.intl.formatMessage({ id: "subject.martina.broadcast.passive-additional" }), origin: "T", value: Constants.T.broadcasting_mark_damage }]
    ]
})

export default table;