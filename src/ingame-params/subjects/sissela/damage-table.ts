import { calculateValue } from "app-types/value-ratio/calculation";
import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Constants from "./constants.json";
import { AdditionalAmpStrategy, AdditionalHealStrategy } from "./status-override";

const rStrategy: UniqueValueStrategy = ({ config, status, hp }) => {
    const skillLevel = config.skillLevels.R;
    const lostHPRatio = status.maxHp.calculatedValue.sub(hp).div(status.maxHp.calculatedValue).times(100).floor();
    const baseValue = calculateValue(Constants.R.damage, status, config, skillLevel).static;
    const additionalValue = lostHPRatio.times(Constants.R.lost_hp_conversion[skillLevel]).floor();
    return {
        value: baseValue.add(additionalValue),
        equationExpression: [
            {
                expression: [
                    `${Constants.R.damage.base[skillLevel]} + `,
                    {ratioKey: "amp"},
                    `${status.skillAmp.calculatedValue.toString()} x ${Constants.R.damage.amp}% + `,
                    {intlID: "subject.sissela.r-losthp"},
                    `${lostHPRatio} x ${Constants.R.lost_hp_conversion[skillLevel]} = ${additionalValue.toString()}`
                ]
            }
        ]
    }
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.sissela.passive-additional"}), skill: "T", value: Constants.T.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.sissela.q-pass"}), skill: "Q", value: Constants.Q.first_damage},
            {label: props.intl.formatMessage({id: "subject.sissela.q-blast"}), skill: "Q", value: Constants.Q.second_damage}
        ],
        [{label: "W", skill: "W", value: Constants.W.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.sissela.e-shield"}), skill: "E", value: Constants.E.shield, type: {type: "shield", target: "self"}},
            {label: props.intl.formatMessage({id: "subject.sissela.e-damage"}), skill: "E", value: Constants.E.damage},
        ],
        [{label: "R", skill: "R", value: rStrategy}],
        [
            {label: props.intl.formatMessage({id: "subject.sissela.t-amp"}), skill: "T", value: AdditionalAmpStrategy, type: {type: "misc"}},
            {label: props.intl.formatMessage({id: "subject.sissela.t-heal"}), skill: "T", value: AdditionalHealStrategy, type: {type: "heal", target: "self"}},
        ]
    ]   
})

export default table;