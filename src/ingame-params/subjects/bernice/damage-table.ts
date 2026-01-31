import Decimal from "decimal.js";
import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";
import { BerniceCriticalDamage } from "./t";

const firstMaxDamage = {
    attack: [1,2,3].map(i => Constants.T.base_damage.attack + Constants.T.additional_damage.attack * i),
    basicAttackAmp: Constants.T.base_damage.basicAttackAmp
}

const table: DamageTableGenerator = props => {
    const criticalMultiplier = BerniceCriticalDamage(props.status).toNumber();
    return {
        basicAttack: [
            {label: props.intl.formatMessage({id: "subject.bernice.aa-min"}), origin: "T", value: Constants.T.base_damage, type: {type: "basic", critical: "none"}},   
            {label: props.intl.formatMessage({id: "subject.bernice.aa-max"}), origin: "T", value: firstMaxDamage, type: {type: "basic", critical: "none", hitCount: Constants.T.bullet}},
            {label: props.intl.formatMessage({id: "subject.bernice.critical-min"}), origin: "T", value: Constants.T.base_damage, type: {type: "basic", critical: "none"}, multiplier: criticalMultiplier},   
            {label: props.intl.formatMessage({id: "subject.bernice.critical-max"}), origin: "T", value: firstMaxDamage, type: {type: "basic", critical: "none", hitCount: Constants.T.bullet}, multiplier: criticalMultiplier}
        ],
        skill: [
            [
                {label: "Q", origin: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.bernice.q-enhanced"}), origin: "Q", value: Constants.Q.enhanced_damage}
            ],
            [{label: props.intl.formatMessage({id: "subject.bernice.w-bleeding"}), origin: "W", value: Constants.W.damage, type: {type: "true"}}],
            [
                {label: "R", origin: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.bernice.r-displacement"}), origin: "R", value: Constants.R.second_damage}
            ]
        ]   
    }
}

export default table;