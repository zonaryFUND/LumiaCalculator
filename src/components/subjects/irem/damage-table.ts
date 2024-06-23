import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.irem.irem-r-aa-additional"}), skill: "R", value: Constants.IremR.damage},
        {label: props.intl.formatMessage({id: "subject.irem.cat-q-aa-rush"}), skill: "Q", value: Constants.CatQ.damage},
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.irem.irem-q-bounce"}, {value: 0}), skill: "Q", value: Constants.IremQ.damage},
            {label: props.intl.formatMessage({id: "subject.irem.irem-q-bounce"}, {value: 1}), skill: "Q", value: Constants.IremQ.damage, multiplier: [{basic: (1 + Constants.IremQ.ratio) * 100}]},
            {label: props.intl.formatMessage({id: "subject.irem.irem-q-bounce"}, {value: 2}), skill: "Q", value: Constants.IremQ.damage, multiplier: [{basic: (1 + Constants.IremQ.ratio * 2) * 100}]},
            {label: props.intl.formatMessage({id: "subject.irem.irem-q-bounce"}, {value: 3}), skill: "Q", value: Constants.IremQ.damage, multiplier: [{basic: (1 + Constants.IremQ.ratio * 3) * 100}]},
        ],
        [{label: props.intl.formatMessage({id: "subject.irem.irem-w"}), skill: "W", value: Constants.IremW.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.irem.cat-q-punch"}), skill: "Q", value: Constants.CatQ.rush_damage},
            {label: props.intl.formatMessage({id: "subject.irem.cat-q-punch-max-hit"}, {value: Constants.CatQ.rush.amount}), skill: "Q", value: Constants.CatQ.rush_damage, multiplier: [{basic: Constants.CatQ.rush.amount * 100}]}
        ],
        [{label: props.intl.formatMessage({id: "subject.irem.cat-w"}), skill: "W", value: Constants.CatW.damage}],
        [{label: props.intl.formatMessage({id: "subject.irem.cat-e"}), skill: "E", value: Constants.CatE.damage}],
        [{label: props.intl.formatMessage({id: "subject.irem.cat-r-shield"}), skill: "R", value: Constants.CatR.shield, type: "shield", target: "self"}]
    ]    
})


export default table;