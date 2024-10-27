import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", skill: "Q", value: Constants.Q.damage}],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [{label: "E", skill: "E", value: Constants.E.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.hyejin.r-initial"}), skill: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.hyejin.r-omen"}), skill: "R", value: Constants.R.card_damage},
            {label: props.intl.formatMessage({id: "subject.hyejin.r-omen-max-hit"}, {value: 5}), skill: "R", value: Constants.R.card_damage, multiplier: 500}
        ],
        [{label: props.intl.formatMessage({id: "subject.hyejin.passive-additional"}), skill: "T", value: Constants.T.damage}]
    ]   
})

export default table;