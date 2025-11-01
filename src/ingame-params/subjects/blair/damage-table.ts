import { calculateValue } from "app-types/value-ratio";
import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";
import { comboShield } from "./dbs-e";
import { weaponSkillLevel } from "./weapon-skill-level";

const table: DamageTableGenerator = props => {
    const dbsWMaxHit = Constants.DoubleBladedSwordW.duration / Constants.DoubleBladedSwordW.tick;
    const dbsEComboShield = comboShield(weaponSkillLevel(props.config.weaponMastery));
    const rDamage = {
        ...Constants.R.damage,
        gauge: Constants.R.damage.gauge * 100
    }
    const tHeal = calculateValue(Constants.D.heal, props.status, props.config, "D");

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.blair.passive-additional"}), origin: "T", value: Constants.T.double_bladed_sword.additional_damage}
        ],
        skill: [
            [
                {label: props.intl.formatMessage({id: "subject.blair.ds-q-first"}), origin: "Q", value: Constants.DualSwordsQ.first_damage},
                {label: props.intl.formatMessage({id: "subject.blair.ds-q-second"}), origin: "Q", value: Constants.DualSwordsQ.second_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.blair.ds-w"}), origin: "W", value: Constants.DualSwordsW.damage},
                {label: props.intl.formatMessage({id: "subject.blair.ds-w-first"}), origin: "W", value: Constants.DualSwordsW.damage, multiplier: 100 + Constants.DualSwordsW.first_hit_enhancement}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.blair.ds-e"}), origin: "E", value: Constants.DualSwordsE.damage},
            ],
            [
                {label: props.intl.formatMessage({id: "subject.blair.dbs-q-first"}), origin: "Q", value: Constants.DoubleBladedSwordQ.first_damage},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-q-second"}), origin: "Q", value: Constants.DoubleBladedSwordQ.second_damage},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-q-heal"}), origin: "Q", value: Constants.DoubleBladedSwordQ.heal, type: {type: "heal", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-q-heal-max"}, {value: 2}), origin: "Q", value: Constants.DoubleBladedSwordQ.heal, type: {type: "heal", target: "self"}, multiplier: 200}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.blair.dbs-w"}), origin: "W", value: Constants.DoubleBladedSwordW.damage},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-w-max-hit"}, {value: dbsWMaxHit}), origin: "W", value: Constants.DoubleBladedSwordW.damage, multiplier: dbsWMaxHit * 100}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.blair.dbs-e-damage"}), origin: "E", value: Constants.DoubleBladedSwordE.damage},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-e-shield"}), origin: "E", value: Constants.DoubleBladedSwordE.shield.effect, type: {type: "shield", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-e-combo-shield"}), origin: "E", value: dbsEComboShield, type: {type: "shield", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.blair.dbs-e-combo-shield-max"}, {value: Constants.DoubleBladedSwordE.max_combo_hit}), origin: "E", value: dbsEComboShield, type: {type: "shield", target: "self"}, multiplier: Constants.DoubleBladedSwordE.max_combo_hit * 100},
            ],
            [
                {label: "R", origin: "R", value: rDamage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.blair.t-heal"}), origin: "T", value: Constants.T.heal, type: {type: "misc", percentExpression: true}}
            ]
        ],
        weaponSkill: [
            {label: props.intl.formatMessage({id: "subject.blair.d-damage"}), origin: "D", value: Constants.D.damage},
            {label: props.intl.formatMessage({id: "subject.blair.d-heal"}), origin: "D", value: Constants.D.heal, type: {type: "misc", percentExpression: true}},
            {label: props.intl.formatMessage({id: "subject.blair.d-heal-amount"}), origin: "D", value: Constants.D.damage, type: {type: "heal", target: "self"}, damageDependentHeal: tHeal.static.toNumber()}
        ]   
    }
}

export default table;