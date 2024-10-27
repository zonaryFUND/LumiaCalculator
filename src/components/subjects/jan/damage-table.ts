import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.jan.e-additional"}), skill: "E", value: Constants.E.damage}
    ],
    skill: [
        [
            {label: "Q1", skill: "Q", value: Constants.Q.damage},
            {label: "Q2", skill: "Q", value: Constants.Q.Q2_damage}
        ],
        [
            {label: "W", skill: "W", value: Constants.W.damage},
            {label: props.intl.formatMessage({id: "subject.jan.w-enhanced"}), skill: "W", value: Constants.W.enhanced_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.jan.e-heal-min"}), "skill": "T", value: Constants.E.damage, type: {type: "heal", target: "self"}, damageDependent: Constants.E.heal.min},
            {label: props.intl.formatMessage({id: "subject.jan.e-heal-max"}), "skill": "T", value: Constants.E.damage, type: {type: "heal", target: "self"}, damageDependent: Constants.E.heal.max}
        ],
        [{label: props.intl.formatMessage({id: "subject.jan.r-rope"}), skill: "R", value: Constants.R.damage}]
    ]   
})

export default table;