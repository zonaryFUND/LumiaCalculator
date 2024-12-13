import Decimal from "decimal.js";
import { DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Constants from "./constants.json";
import { NinaRatioStrategy } from "./nina-ratio-strategy";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";

const ninaBasicAttackStrategy: UniqueValueStrategy = ({ config, status }) => {
    const ninaStatus = status.summoned![0].status;
    const regularDamage = new Decimal(ninaStatus.attackPower);
    const criticalAvailable = ninaStatus.criticalChance.greaterThan(0);
    const criticalDamage = regularDamage.addPercent(new Decimal(BaseCriticalDamagePercent));
    const expectedValue = regularDamage.percent(new Decimal(100).sub(ninaStatus.criticalChance))
        .add(criticalDamage.percent(ninaStatus.criticalChance));

    return {
        value: [
            regularDamage, 
            criticalAvailable ? criticalDamage : undefined, 
            criticalAvailable && ninaStatus.criticalChance.lessThan(100) ? expectedValue : undefined
        ],
        equationExpression: [
            {
                labelIntlID: "app.standard-value",
                expression: [
                    {intlID: "subject.chloe.nina-attack"},
                    `${ninaStatus.attackPower.toString()} x 100% = ${regularDamage.toString()}`
                ]
            },
            {
                labelIntlID: "app.critical-hit",
                expression: [
                    `${regularDamage.toString()} x ${BaseCriticalDamagePercent.add(100).toString()}% = ${criticalDamage?.toString()}`
                ]
            }
        ]
    }
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.chloe.nina-aa"}), skill: "T", value: ninaBasicAttackStrategy, type: {type: "basic"}}
    ],
    skill: [
        [{label: "Q", skill: "Q", value: NinaRatioStrategy("Q", Constants.Q.damage)}],
        [
            {label: props.intl.formatMessage({id: "subject.chloe.w-string-damage-per-sec"}), skill: "W", value: Constants.W.damage, type: {type: "true"}},
            {label: props.intl.formatMessage({id: "subject.chloe.w-string-damage-max"}, {value: Constants.W.duration}), skill: "W", value: Constants.W.damage, type: {type: "true"}, multiplier: Constants.W.duration * 100},
            {label: props.intl.formatMessage({id: "subject.chloe.w-blade"}), skill: "W", value: Constants.W.drop_damage},
            {label: props.intl.formatMessage({id: "subject.chloe.w-nina"}), skill: "W", value: NinaRatioStrategy("W", Constants.W.nina_damage)}
        ],
        [
            {label: "E1", skill: "E", value: Constants.E.first_damage},
            {label: "E2", skill: "E", value: NinaRatioStrategy("E", Constants.E.second_damage)}
        ],
        [
            {label: props.intl.formatMessage({id: "subject.chloe.r-min"}), skill: "R", value: Constants.R.damage, type: {type: "true"}},
            {label: props.intl.formatMessage({id: "subject.chloe.r-max"}), skill: "R", value: Constants.R.damage, multiplier: Constants.R.damage_max_multipler * 100, type: {type: "true"}},
        ],
       [{label: props.intl.formatMessage({id: "subject.chloe.passive-nina"}), skill: "T", value: NinaRatioStrategy("T", Constants.T.damage)}]
    ]
})

export default table;