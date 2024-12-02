import Decimal from "decimal.js";
import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Constants from "./constants.json";
import { calculateValue } from "app-types/value-ratio/calculation";
import { DamageDependentHealStrategy } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";


function kennethTStrategy(
    config: SubjectConfig, 
    status: Status
): {t: DamageDependentHealStrategy, et: DamageDependentHealStrategy} {
    const tHealRatio = calculateValue(Constants.T.heal, status, config, config.skillLevels.T).static;
    const tHealMax = calculateValue(Constants.T.max_heal, status, config, config.skillLevels.T).static;

    const ratio = (calculatedDamage: Decimal) => calculatedDamage.percent(tHealRatio).clamp(0, tHealMax);

    return {
        t: props => {
            return {
                baseValue: props.calculatedDamage,
                heal: ratio(props.calculatedDamage),
                multiplier: tHealRatio
            }
        },
        et: props => {
            const trueDamage = props.potency.percent(Constants.E.damage_conversion);
            const skillDamage = props.calculatedDamage.percent(100 - Constants.E.damage_conversion);
            const baseValue = trueDamage.add(skillDamage).floor();

            return {
                baseValue,
                heal: ratio(baseValue),
                multiplier: tHealRatio
            };
        }
    }
}

const table: DamageTableGenerator = props => {
    const {t, et} = kennethTStrategy(props.config, props.status);

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.kenneth.e-additional"}), skill: "E", value: Constants.E.damage}
        ],
        skill: [
            [
                {label: "Q", skill: "Q", value: Constants.Q.damage},
                {label: props.intl.formatMessage({id: "subject.kenneth.q-max-stack"}), skill: "Q", value: Constants.Q.damage, multiplier: 100 + Constants.Q.max_stack_damage},
                {label: props.intl.formatMessage({id: "subject.kenneth.q-heal-min"}), skill: "Q", value: {lostHP: Constants.Q.max_stack_heal}, type: {type: "heal", target: "self"}},
                {label: props.intl.formatMessage({id: "subject.kenneth.q-heal-max"}), skill: "Q", value: {lostHP: Constants.Q.max_stack_heal_max}, type: {type: "heal", target: "self"}}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.kenneth.w-damage-reduction"}), skill: "W", value: Constants.W.damage_reduction, type: {type: "misc", percentExpression: true}},
                {label: props.intl.formatMessage({id: "subject.kenneth.w-shield"}), skill: "W", value: Constants.W.shield, type: {type: "shield", target: "self"}}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.kenneth.r-swing-up"}), skill: "R", value: Constants.R.first_damage},
                {label: props.intl.formatMessage({id: "subject.kenneth.r-midair-1hit"}), skill: "R", value: Constants.R.second_damage},
                {label: props.intl.formatMessage({id: "subject.kenneth.r-midair-2hit"}), skill: "R", value: Constants.R.second_damage, multiplier: 200},
                {label: props.intl.formatMessage({id: "subject.kenneth.r-swing-down"}), skill: "R", value: Constants.R.third_damage}
            ],
            [
                {label: props.intl.formatMessage({id: "subject.kenneth.passive-additional"}), skill: "T", value: Constants.T.damage},
                {label: props.intl.formatMessage({id: "subject.kenneth.et-conversion"}), skill: "T", value: Constants.T.damage, multiplier: Constants.E.damage_conversion, type: {type: "true"}},
                {label: props.intl.formatMessage({id: "subject.kenneth.t-heal"}), skill: "T", value: Constants.T.heal, type: {type: "misc", percentExpression: true}},
                {label: props.intl.formatMessage({id: "subject.kenneth.t-heal-value"}), skill: "T", value: Constants.T.damage, type: {type: "heal", target: "self"}, damageDependentHeal: t},
                {label: props.intl.formatMessage({id: "subject.kenneth.t-e-heal"}), skill: "T", value: Constants.T.damage, type: {type: "heal", target: "self"}, damageDependentHeal: et}
            ]
        ]
    }
}

export default table;