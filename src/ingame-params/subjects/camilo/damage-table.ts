import Decimal from "decimal.js";
import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import Constants from "./constants";
import { CamiloRHealStrategy } from "./r";



const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard"
    ],
    skill: [
        [
            {label: "Q", origin: "Q", value: Constants.Q.damage, type: {type: "basic"}},
            {label: props.intl.formatMessage({id: "subject.camilo.q2-first"}), origin: "Q", value: Constants.Q.Q2_first_damage, type: {type: "basic"}},
            {label: props.intl.formatMessage({id: "subject.camilo.q2-second"}), origin: "Q", value: Constants.Q.Q2_second_damage, type: {type: "basic"}},
            {label: props.intl.formatMessage({id: "subject.camilo.q2-heal"}), origin: "Q", value: Constants.Q.heal, type: {type: "heal", target: "self"}}
        ],
        [
            {label: "W", origin: "W", value: Constants.W.damage, type: {type: "basic"}},
            {label: props.intl.formatMessage({id: "subject.camilo.w-max-hit"}, {value: Constants.W.count}), origin: "W", value: Constants.W.damage, type: {type: "basic", hitCount: Constants.W.count}, multiplier: Constants.W.count * 100},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.camilo.e1"}), origin: "E", value: Constants.E.damage},
            {label: props.intl.formatMessage({id: "subject.camilo.e2"}), origin: "E", value: Constants.E.second_damage},
        ],
        [
            {label: props.intl.formatMessage({id: "subject.camilo.r-1hit"}), origin: "R", value: Constants.R.one_hit_damage},
            {label: props.intl.formatMessage({id: "subject.camilo.r-2hit"}), origin: "R", value: Constants.R.two_hit_damage},
            {label: props.intl.formatMessage({id: "subject.camilo.r-heal-min"}), origin: "R", value: CamiloRHealStrategy("min"), type: {type: "heal", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.camilo.r-heal-max"}, {value: Constants.R.heal.maxHit}), origin: "R", value: CamiloRHealStrategy("max"), type: {type: "heal", target: "self"}}
        ],
        [{label: props.intl.formatMessage({id: "subject.camilo.passive-shield"}), origin: "T", value: Constants.T.shield, type: {type: "shield", target: "self"}}]
    ]
})

export default table;