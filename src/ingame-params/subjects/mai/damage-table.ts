import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.mai.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.mai.w-defense"}), skill: "W", value: {defense: Constants.W.defense}, type: {type: "misc"}},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.mai.e-shield"}), skill: "E", value: Constants.E.shield, type: {type: "shield", target: "any"}},
            {label: "E2", skill: "E", value: Constants.E.damage}
        ],
        [{label: props.intl.formatMessage({id: "subject.mai.r-heal"}), skill: "R", value: Constants.R.heal, type: {type: "heal", target: "any"}}]
    ]   
})

export default table;