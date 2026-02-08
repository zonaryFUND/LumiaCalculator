import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.irem.irem-r-aa-additional" }), origin: "R", value: Constants.IremR.damage },
        { label: props.intl.formatMessage({ id: "subject.irem.cat-q-aa-rush" }), origin: "Q", value: Constants.CatQ.damage },
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.irem.irem-q-bounce" }, { value: 0 }), origin: "Q", value: Constants.IremQ.damage },
            { label: props.intl.formatMessage({ id: "subject.irem.irem-q-bounce" }, { value: 1 }), origin: "Q", value: Constants.IremQ.damage, multiplier: (1 + Constants.IremQ.ratio) * 100 },
            { label: props.intl.formatMessage({ id: "subject.irem.irem-q-bounce" }, { value: 2 }), origin: "Q", value: Constants.IremQ.damage, multiplier: (1 + Constants.IremQ.ratio * 2) * 100 },
            { label: props.intl.formatMessage({ id: "subject.irem.irem-q-bounce" }, { value: 3 }), origin: "Q", value: Constants.IremQ.damage, multiplier: (1 + Constants.IremQ.ratio * 3) * 100 },
        ],
        [{ label: props.intl.formatMessage({ id: "subject.irem.irem-w" }), origin: "W", value: Constants.IremW.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.irem.cat-q-rush" }), origin: "Q", value: Constants.CatQ.damage },
            { label: props.intl.formatMessage({ id: "subject.irem.cat-q-punch" }), origin: "Q", value: Constants.CatQ.rush_damage },
            { label: props.intl.formatMessage({ id: "subject.irem.cat-q-punch-cc" }), origin: "Q", value: Constants.CatQ.rush_damage, multiplier: Constants.CatQ.additional_damage + 100 },
            { label: props.intl.formatMessage({ id: "subject.irem.cat-q-punch-max-hit" }, { value: Constants.CatQ.rush.amount }), origin: "Q", value: Constants.CatQ.rush_damage, multiplier: Constants.CatQ.rush.amount * (Constants.CatQ.additional_damage + 100) }
        ],
        [{ label: props.intl.formatMessage({ id: "subject.irem.cat-w" }), origin: "W", value: Constants.CatW.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.irem.cat-e" }), origin: "E", value: Constants.CatE.damage }],
        [{ label: props.intl.formatMessage({ id: "subject.irem.cat-r-shield" }), origin: "R", value: Constants.CatR.shield, type: { type: "shield", target: "self" } }]
    ]
})


export default table;