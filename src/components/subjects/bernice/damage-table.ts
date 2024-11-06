import Decimal from "decimal.js";
import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";
import { BerniceCriticalDamage } from "./t";

const firstMaxDamage = {
    attack: [1,2,3].map(i => Constants.T.base_damage.attack + Constants.T.additional_damage.attack * i),
    basicAttackAmp: Constants.T.base_damage.basicAttackAmp
}

const table: DamageTableGenerator = props => {
    const criticalMultiplier = BerniceCriticalDamage(props.status).toNumber();
    return {
        basicAttack: [
            {label: props.intl.formatMessage({id: "subject.bernice.aa-min"}), skill: "T", value: Constants.T.base_damage, type: {type: "basic", critical: "none"}},   
            {label: props.intl.formatMessage({id: "subject.bernice.aa-max"}), skill: "T", value: firstMaxDamage, type: {type: "basic", critical: "none", hitCount: Constants.T.bullet[props.config.skillLevels.T]}},
            {label: props.intl.formatMessage({id: "subject.bernice.critical-min"}), skill: "T", value: Constants.T.base_damage, type: {type: "basic", critical: "none"}, multiplier: criticalMultiplier},   
            {label: props.intl.formatMessage({id: "subject.bernice.critical-max"}), skill: "T", value: firstMaxDamage, type: {type: "basic", critical: "none", hitCount: Constants.T.bullet[props.config.skillLevels.T]}, multiplier: criticalMultiplier}
        ],
        skill: [
            [
                {label: "Q", skill: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.bernice.q-enhanced"}), skill: "Q", value: Constants.Q.enhanced_damage}
            ],
            [{label: props.intl.formatMessage({id: "subject.bernice.w-bleeding"}), skill: "W", value: Constants.W.damage, type: {type: "true"}}],
            [
                {label: "R", skill: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.bernice.r-displacement"}), skill: "R", value: Constants.R.second_damage}
            ]
        ]   
    }
}

export default table;