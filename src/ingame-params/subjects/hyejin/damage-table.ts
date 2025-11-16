import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: ["standard"],
    skill: [
        [{label: "Q", origin: "Q", value: Constants.Q.damage}],
        [{label: "W", origin: "W", value: Constants.W.damage}],
        [
<<<<<<< HEAD
            {label: props.intl.formatMessage({id: "subject.hyejin.e-card"}), origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.hyejin.e-move"}), origin: "E", value: Constants.E.second_damage},
=======
            {label: props.intl.formatMessage({id: "subject.hyejin.e-projectile"}), origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.hyejin.e-arrive"}), origin: "E", value: Constants.E.second_damage},
>>>>>>> recovery-9.0
        ],
        [
            {label: props.intl.formatMessage({id: "subject.hyejin.r-initial"}), origin: "R", value: Constants.R.first_damage},
            {label: props.intl.formatMessage({id: "subject.hyejin.r-omen"}), origin: "R", value: Constants.R.card_damage},
            {label: props.intl.formatMessage({id: "subject.hyejin.r-omen-max-hit"}, {value: 5}), origin: "R", value: Constants.R.card_damage, multiplier: 500}
        ],
        [{label: props.intl.formatMessage({id: "subject.hyejin.passive-additional"}), origin: "T", value: Constants.T.damage}]
    ]   
})

export default table;