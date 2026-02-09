import { calculateValue } from "app-types/value-ratio";
import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../type";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Constants from "./constants";
import { AdditionalAmpStrategy, AdditionalHealStrategy } from "./perpetual-status";

const rStrategy: UniqueValueStrategy = ({ config, status, hp }) => {
    const skillLevel = config.skillLevels.R;
    const lostHPRatio = status.maxHp.calculatedValue.sub(hp).div(status.maxHp.calculatedValue).times(100).floor();
    const baseValue = calculateValue(Constants.R.damage, status, config, "R").static;
    const additionalValue = lostHPRatio.times(Constants.R.lost_hp_conversion[skillLevel]).floor();
    return {
        value: baseValue.add(additionalValue),
        equationExpression: [
            {
                expression: [
                    `${Constants.R.damage.base[skillLevel]} + `,
                    { ratioKey: "amp" },
                    `${status.skillAmp.calculatedValue.toString()} x ${Constants.R.damage.amp}% + `,
                    { intlID: "subject.sissela.r-losthp" },
                    `${lostHPRatio} x ${Constants.R.lost_hp_conversion[skillLevel]} = ${additionalValue.toString()}`
                ]
            }
        ]
    }
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        { label: props.intl.formatMessage({ id: "subject.sissela.passive-additional" }), origin: "T", value: Constants.T.damage }
    ],
    skill: [
        [
            { label: props.intl.formatMessage({ id: "subject.sissela.q-pass" }), origin: "Q", value: Constants.Q.first_damage },
            { label: props.intl.formatMessage({ id: "subject.sissela.q-blast" }), origin: "Q", value: Constants.Q.second_damage }
        ],
        [{ label: "W", origin: "W", value: Constants.W.damage }],
        [
            { label: props.intl.formatMessage({ id: "subject.sissela.e-shield" }), origin: "E", value: Constants.E.shield, type: { type: "shield", target: "self" } },
            { label: props.intl.formatMessage({ id: "subject.sissela.e-damage" }), origin: "E", value: Constants.E.damage },
        ],
        [{ label: "R", origin: "R", value: rStrategy }],
        [
            { label: props.intl.formatMessage({ id: "subject.sissela.t-amp" }), origin: "T", value: AdditionalAmpStrategy, type: { type: "misc" } },
            { label: props.intl.formatMessage({ id: "subject.sissela.t-heal" }), origin: "T", value: AdditionalHealStrategy, type: { type: "heal", target: "self" } },
        ]
    ]
})

export default table;